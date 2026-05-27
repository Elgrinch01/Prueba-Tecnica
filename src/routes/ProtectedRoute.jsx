import { Navigate, useLocation } from 'react-router-dom'
import { getStoredUser } from '../auth/storage'

export function ProtectedRoute({ children }) {
  const location = useLocation()
  const user = getStoredUser()

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}