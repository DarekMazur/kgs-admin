import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.tsx'
import { jwtDecode } from 'jwt-decode'

const PrivateRoutes = () => {
  const { isAuthenticated, token } = useAuth()

  if (isAuthenticated) {
    // @ts-ignore
    if (token && jwtDecode(token).role_id < 4) {
      return <Outlet />
    }
    return <Navigate to="/unauthorized" />
  } else {
    return <Navigate to="/login" />
  }
}
export default PrivateRoutes
