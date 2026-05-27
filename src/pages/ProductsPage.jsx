import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import api from '../services/api'

const EMPTY_FORM = {
  nombre: '',
  precio: '',
  categoria: '',
  stock: '',
  imagen: '',
}

export function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [form, setForm] = useState(EMPTY_FORM)
  const [editingId, setEditingId] = useState(null)
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    let mounted = true

    async function loadProducts() {
      setLoading(true)
      setError(null)

      try {
        const data = await api.fetchProducts()
        if (mounted) setProducts(data)
      } catch (err) {
        if (mounted) setError(err.message || 'No se pudo cargar el inventario.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadProducts()

    return () => {
      mounted = false
    }
  }, [])

  const filteredProducts = products.filter((product) => {
    const term = query.trim().toLowerCase()

    if (!term) {
      return true
    }

    return (
      product.nombre?.toLowerCase().includes(term) ||
      product.categoria?.toLowerCase().includes(term)
    )
  })

  const resetForm = () => {
    setForm(EMPTY_FORM)
    setEditingId(null)
    setFormError('')
  }

  const handleEdit = (product) => {
    setEditingId(product.id)
    setForm({
      nombre: product.nombre ?? '',
      precio: String(product.precio ?? ''),
      categoria: product.categoria ?? '',
      stock: String(product.stock ?? ''),
      imagen: product.imagen ?? '',
    })
    setFormError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nombre = form.nombre.trim()
    const categoria = form.categoria.trim()
    const imagen = form.imagen.trim()
    const precio = Number(form.precio)
    const stock = Number(form.stock)

    if (!nombre || !categoria || !imagen) {
      setFormError('Completa todos los campos.')
      return
    }

    if (Number.isNaN(precio) || Number.isNaN(stock) || precio < 0 || stock < 0) {
      setFormError('Precio y stock deben ser números mayores o iguales a cero.')
      return
    }

    setSaving(true)
    setFormError('')

    try {
      const payload = {
        nombre,
        precio,
        categoria,
        stock,
        imagen,
      }

      if (editingId) {
        await api.updateProduct(editingId, payload)
      } else {
        await api.createProduct(payload)
      }

      const data = await api.fetchProducts()
      setProducts(data)
      resetForm()
    } catch (err) {
      setFormError(err.message || 'No se pudo guardar el producto.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (product) => {
    const result = await Swal.fire({
      title: '¿Eliminar producto?',
      text: `Vas a borrar ${product.nombre}. Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    })

    if (!result.isConfirmed) {
      return
    }

    setDeletingId(product.id)

    try {
      await api.deleteProduct(product.id)
      const data = await api.fetchProducts()
      setProducts(data)

      if (editingId === product.id) {
        resetForm()
      }

      await Swal.fire({
        title: 'Producto eliminado',
        text: 'El producto se eliminó correctamente.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      })
    } catch (err) {
      await Swal.fire({
        title: 'No se pudo eliminar',
        text: err.message || 'Intenta nuevamente.',
        icon: 'error',
      })
    } finally {
      setDeletingId(null)
    }
  }

  const retryLoad = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await api.fetchProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message || 'No se pudo cargar el inventario.')
    } finally {
      setLoading(false)
    }
  }

  const skeletonItems = Array.from({ length: 6 }, (_, index) => index)

  return (
    <section className="page-grid">
      <div className="products-header">
        <h2>Inventario</h2>
        <input
          className="form-control search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar por nombre o categoría"
        />
      </div>

      <section className="content-card product-form-card">
        <div className="product-form-header">
          <div>
            <h3>{editingId ? 'Editar producto' : 'Nuevo producto'}</h3>
          </div>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              Cancelar edición
            </button>
          )}
        </div>

        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              className="form-control"
              value={form.nombre}
              onChange={(event) => setForm((current) => ({ ...current, nombre: event.target.value }))}
              placeholder="Nombre del producto"
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoría</label>
            <input
              id="categoria"
              className="form-control"
              value={form.categoria}
              onChange={(event) => setForm((current) => ({ ...current, categoria: event.target.value }))}
              placeholder="Ej: Ropa, Hogar, Electrónica"
            />
          </div>

          <div className="form-group">
            <label htmlFor="precio">Precio</label>
            <input
              id="precio"
              className="form-control"
              type="number"
              min="0"
              step="0.01"
              value={form.precio}
              onChange={(event) => setForm((current) => ({ ...current, precio: event.target.value }))}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              className="form-control"
              type="number"
              min="0"
              step="1"
              value={form.stock}
              onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))}
              placeholder="0"
            />
          </div>

          <div className="form-group product-form-full">
            <label htmlFor="imagen">URL de imagen</label>
            <input
              id="imagen"
              className="form-control"
              value={form.imagen}
              onChange={(event) => setForm((current) => ({ ...current, imagen: event.target.value }))}
              placeholder="https://..."
            />
          </div>

          {formError && <div className="form-error">{formError}</div>}

          <div className="product-form-actions product-form-full">
            <button className="btn" type="submit" disabled={saving}>
              {saving ? 'Guardando...' : editingId ? 'Actualizar producto' : 'Crear producto'}
            </button>
          </div>
        </form>
      </section>

      {loading && (
        <section className="content-card">
          <div className="loading-header">
            <div>
              <h3>Cargando inventario</h3>
              <p className="muted">Estamos trayendo los productos desde MockAPI.</p>
            </div>
          </div>
          <div className="product-grid">
            {skeletonItems.map((item) => (
              <article key={item} className="product-card product-skeleton" aria-hidden="true">
                <div className="skeleton skeleton-image" />
                <div className="skeleton skeleton-line title" />
                <div className="skeleton skeleton-line short" />
                <div className="skeleton-row">
                  <div className="skeleton skeleton-line compact" />
                  <div className="skeleton skeleton-line compact" />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {error && !loading && (
        <section className="content-card error-card">
          <div>
            <h3>No se pudo cargar el inventario</h3>
            <p className="muted">{error}</p>
          </div>
          <div>
            <button type="button" className="btn btn-secondary" onClick={retryLoad}>
              Reintentar
            </button>
          </div>
        </section>
      )}

      {!loading && !error && (
        <section className="content-card">
          <div className="product-grid">
            {filteredProducts.map((p) => (
              <article key={p.id} className="product-card">
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }}
                />
                <h3 style={{ margin: '8px 0 4px' }}>{p.nombre}</h3>
                <div className="muted">{p.categoria}</div>
                <div
                  style={{
                    marginTop: 8,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  <strong>${Number(p.precio).toFixed(2)}</strong>
                  <small className="muted">Stock: {p.stock}</small>
                </div>
                <div className="product-card-actions">
                  <button type="button" className="btn btn-secondary" onClick={() => handleEdit(p)}>
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleDelete(p)}
                    disabled={deletingId === p.id}
                  >
                    {deletingId === p.id ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-state">No hay resultados.</div>
          )}
        </section>
      )}
    </section>
  )
}