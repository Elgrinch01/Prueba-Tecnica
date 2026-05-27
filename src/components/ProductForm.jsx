import React from 'react'

export function ProductForm({ form, setForm, onSubmit, saving, editingId, resetForm, formError }) {
  return (
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

      <form className="product-form" onSubmit={onSubmit}>
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
  )
}

export default ProductForm
