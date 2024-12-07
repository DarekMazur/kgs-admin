import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const PrivateRoutes = () => {
  const { isAuthenticated, isAuthorized } = useAuth()

  if (isAuthenticated) {
    if (isAuthorized) {
      return <Outlet />
    }
    return <Navigate to="/unauthorized" />
  } else {
    return <Navigate to="/login" />
  }
}
export default PrivateRoutes
