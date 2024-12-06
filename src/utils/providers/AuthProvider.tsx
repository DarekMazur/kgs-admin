import { createContext, ReactElement, useContext, useState } from 'react'

interface IAuthValue {
  isAuthenticated: boolean
  login: (userToken: string) => void
  logout: () => void
}

const initialValue = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
}

const AuthContext = createContext<IAuthValue>(initialValue)
export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [token, setToken] = useState<string | null>(null)
  const login = (userToken: string) => {
    setToken(userToken)
  }
  const logout = () => {
    setToken(null)
  }
  const isAuthenticated = !!token
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
