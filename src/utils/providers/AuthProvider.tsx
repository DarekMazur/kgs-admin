import { createContext, ReactElement, useContext, useEffect, useState } from 'react'
import { useMe } from '../hooks/useMe.tsx'
import { useDispatch } from 'react-redux'
import { setGlobalUser } from '../../../store'
import { useNavigate } from 'react-router'

interface IAuthValue {
  isAuthenticated: boolean
  isAuthorized: boolean
  login: (userToken: string, userId: string) => void
  logout: () => void
}

const initialValue = {
  isAuthenticated: false,
  isAuthorized: false,
  login: () => {},
  logout: () => {}
}

const AuthContext = createContext<IAuthValue>(initialValue)

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const me = useMe()
  const [token, setToken] = useState<string | null>(localStorage.getItem('jwt'))
  const [isAuthenticated, setIsAuthenticated] = useState(initialValue.isAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setIsAuthenticated(!!token)
  }, [token])

  const login = async (userId: string, userToken: string) => {
    try {
      await me(userId, userToken)

      localStorage.setItem('jwt', userToken)
      setToken(userToken)
      navigate('/admin')
    } catch (error) {
      console.error(error)
    }
  }

  const logout = () => {
    localStorage.removeItem('jwt')
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

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
