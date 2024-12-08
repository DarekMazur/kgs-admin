import { createContext, ReactElement, useEffect, useState } from 'react'
import { useMe } from '../hooks/useMe.tsx'
import { useDispatch } from 'react-redux'
import { setGlobalUser } from '../../../store'
import { useNavigate } from 'react-router'
import { jwtDecode } from 'jwt-decode'
import { IAuthValue } from '../types.ts'

export const initialValue = {
  isAuthenticated: false,
  isAuthorized: false,
  login: () => {},
  logout: () => {}
}

export const AuthContext = createContext<IAuthValue>(initialValue)

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const me = useMe()
  const [token, setToken] = useState<string | null>(localStorage.getItem('jwt'))
  const [isAuthenticated, setIsAuthenticated] = useState(initialValue.isAuthenticated)
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
