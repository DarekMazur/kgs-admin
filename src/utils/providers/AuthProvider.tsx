import { ReactElement, useEffect, useState } from 'react'
import { useMe } from '../hooks/useMe.tsx'
import { useDispatch } from 'react-redux'
import { setGlobalUser } from '../../../store'
import { useNavigate } from 'react-router'
import { jwtDecode } from 'jwt-decode'
import { AuthContext } from '../../../store/context/AuthContext.tsx'

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const me = useMe()
  const [token, setToken] = useState<string | null>(localStorage.getItem('jwt'))
  const [isAuthenticated, setIsAuthenticated] = useState(!!token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setIsAuthenticated(!!token)
  }, [token])

  useEffect(() => {
    if (token) {
      // @ts-ignore
      const id = jwtDecode(token).id
      login(id, token, true)
    }
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
      navigate('/admin')
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
