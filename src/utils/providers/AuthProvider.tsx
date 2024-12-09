import { ReactElement, useEffect, useState } from 'react'
import { useMe } from '../hooks/useMe.tsx'
import { useDispatch } from 'react-redux'
import { setGlobalUser } from '../../../store'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from '../../../store/context/AuthContext.tsx'
import { Outlet, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router'

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const me = useMe()
  const location = useLocation()
  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('jwt') || sessionStorage.getItem('jwt')
  )
  const [isAuthenticated, setIsAuthenticated] = useState(!!token)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsAuthenticated(!!token)
  }, [token])

  useEffect(() => {
    const userLogin = async () => {
      if (token) {
        // @ts-ignore
        const id = jwtDecode(token).id
        await login(id, token, !!localStorage.getItem('jwt'))
        return <Outlet />
      }
    }

    userLogin().catch((error) => console.error(error))
  }, [])

  const login = async (userId: string, userToken: string, isPermanent: boolean) => {
    try {
      await me(userId, userToken)

      if (isPermanent) {
        localStorage.setItem('jwt', userToken)
      } else {
        sessionStorage.setItem('jwt', userToken)
      }

      setToken(userToken)

      if (location.pathname === '/login') {
        navigate('/admin')
      } else {
        return <Outlet />
      }
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    localStorage.removeItem('jwt')
    sessionStorage.removeItem('jwt')
    sessionStorage.removeItem('auth')
    setToken(null)
    dispatch(setGlobalUser(null))
  }

  const isAuthorized = sessionStorage.getItem('auth') === 'true'

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAuthorized, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
