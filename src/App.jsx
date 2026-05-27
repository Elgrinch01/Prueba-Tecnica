import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { getStoredUser } from './auth/storage'
import { DashboardLayout } from './layouts/DashboardLayout'
import { LoginPage } from './pages/LoginPage'
import { ProductsPage } from './pages/ProductsPage'
import { ProtectedRoute } from './routes/ProtectedRoute'

function App() {
  const user = getStoredUser()

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/productos" replace /> : <LoginPage />}
      />
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/productos" replace />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="*" element={<Navigate to="/productos" replace />} />
      </Route>
      <Route path="*" element={<Navigate to={user ? '/productos' : '/login'} replace />} />
    </Routes>
  )
}

export default App
