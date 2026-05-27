export function ProductsPage() {
  return (
    <section className="page-grid">
      <div>
        <h2>Inventario</h2>
        <p className="muted">
          Base inicial del panel lista para conectar la API MockAPI y listar productos.
        </p>
      </div>

      <section className="stats-grid">
        <article className="stat-card">
          <span className="muted">Estado</span>
          <p className="stat-value">Autenticación lista</p>
        </article>
        <article className="stat-card">
          <span className="muted">Siguiente bloque</span>
          <p className="stat-value">API + productos</p>
        </article>
        <article className="stat-card">
          <span className="muted">Ruta protegida</span>
          <p className="stat-value">/productos</p>
        </article>
      </section>

      <section className="content-card">
        <h2>Listo para continuar</h2>
        <p className="muted">
          Ya quedó montada la estructura base. El siguiente commit puede enfocarse en integrar la
          API de MockAPI y construir la grilla de productos con filtros.
        </p>
      </section>
    </section>
  )
}