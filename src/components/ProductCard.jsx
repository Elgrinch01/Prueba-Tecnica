import React from 'react'

export function ProductCard({ product, onEdit, onDelete, deletingId }) {
  return (
    <article key={product.id} className="product-card">
      <img
        src={product.imagen}
        alt={product.nombre}
        style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8 }}
      />
      <h3 style={{ margin: '8px 0 4px' }}>{product.nombre}</h3>
      <div className="muted">{product.categoria}</div>
      <div
        style={{
          marginTop: 8,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <strong>${Number(product.precio).toFixed(2)}</strong>
        <small className="muted">Stock: {product.stock}</small>
      </div>
      <div className="product-card-actions">
        <button type="button" className="btn btn-secondary" onClick={() => onEdit(product)}>
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onDelete(product)}
          disabled={deletingId === product.id}
        >
          {deletingId === product.id ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard
