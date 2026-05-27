import { useEffect, useState } from 'react'
import api from '../services/api'

export function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await api.fetchProducts()
        if (mounted) setProducts(data)
      } catch (err) {
        if (mounted) setError(err.message || 'Error fetching products')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

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

      {loading && <div className="content-card">Cargando productos...</div>}
      {error && <div className="content-card">Error: {error}</div>}

      {!loading && !error && (
        <section className="content-card">
          <div className="product-grid">
            {filteredProducts.map((p) => (
              <article key={p.id} className="product-card">
                <img src={p.imagen} alt={p.nombre} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }} />
                <h3 style={{ margin: '8px 0 4px' }}>{p.nombre}</h3>
                <div className="muted">{p.categoria}</div>
                <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>${Number(p.precio).toFixed(2)}</strong>
                  <small className="muted">Stock: {p.stock}</small>
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