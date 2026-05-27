import { Outlet, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export function DashboardLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login', { replace: true })
  }

  return (
    <main className="app-shell">
      <section className="panel dashboard-layout">
        <Navbar onLogout={handleLogout} />
        <Outlet />
      </section>
    </main>
  )
}