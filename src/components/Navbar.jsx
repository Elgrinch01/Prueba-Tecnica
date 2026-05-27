import { clearStoredUser, getStoredUser } from '../auth/storage'

export function Navbar({ onLogout }) {
  const user = getStoredUser()

  const handleLogout = () => {
    clearStoredUser()
    onLogout?.()
  }

  return (
    <header className="navbar">
      <div className="brand" aria-label="Panel administrativo">
        <div className="brand-mark">PT</div>
        <div>
          <div>Panel de Inventario</div>
          <small className="muted">E-commerce admin dashboard</small>
        </div>
      </div>

      <div className="nav-user">
        <div className="user-chip">
          Sesión: <strong>{user?.name ?? 'Invitado'}</strong>
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}