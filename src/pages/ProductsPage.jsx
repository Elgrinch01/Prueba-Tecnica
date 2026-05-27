import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import api from '../services/api'
import ProductCard from '../components/ProductCard'
import ProductForm from '../components/ProductForm'

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
      await Swal.fire({
        title: editingId ? 'Producto actualizado' : 'Producto creado',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      })
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

      <ProductForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        saving={saving}
        editingId={editingId}
        resetForm={resetForm}
        formError={formError}
      />

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
              <ProductCard
                key={p.id}
                product={p}
                onEdit={handleEdit}
                onDelete={handleDelete}
                deletingId={deletingId}
              />
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