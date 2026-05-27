import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveUser } from '../auth/storage'

export function LoginPage() {
  const [name, setName] = useState('')
  const [pin, setPin] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!name.trim() || !pin.trim()) {
      return
    }

    setIsSubmitting(true)

    const user = {
      name: name.trim(),
      pin: pin.trim(),
    }

    saveUser(user)
    navigate('/productos', { replace: true })
    setIsSubmitting(false)
  }

  return (
    <main className="app-shell">
      <section className="auth-grid">
        <div className="hero-panel">
          <div>
            <div className="eyebrow">Panel de inventario</div>
            <h1 className="hero-title">Administra productos desde un solo lugar</h1>
            <p className="hero-copy">
              Inicia sesión para revisar el catálogo, editar productos y mantener protegido el acceso al panel.
            </p>
          </div>

          <ul className="bullet-list">
            <li>Acceso simulado con LocalStorage.</li>
            <li>Protección de rutas para el panel.</li>
            <li>Base lista para catálogo y CRUD.</li>
          </ul>
        </div>

        <form className="login-card" onSubmit={handleSubmit}>
          <h2>Ingresar al panel</h2>
          <p className="muted">Usa cualquier nombre de usuario y cualquier PIN para entrar.</p>

          <div className="form-group">
            <label htmlFor="username">Nombre de usuario</label>
            <input
              id="username"
              className="form-control"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ej: Ana Gómez"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pin">PIN</label>
            <input
              id="pin"
              className="form-control"
              type="password"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              placeholder="Ingresa cualquier PIN"
              autoComplete="current-password"
            />
          </div>

          <div className="form-group" style={{ marginTop: '28px' }}>
            <button className="btn" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Ingresando...' : 'Entrar al panel'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}