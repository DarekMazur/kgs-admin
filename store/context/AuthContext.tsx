import { createContext } from 'react'
import { IAuthValue } from '../../src/utils/types.ts'

const initialValue = {
  isAuthenticated: false,
  isAuthorized: false,
  login: () => {},
  logout: () => {}
}

export const AuthContext = createContext<IAuthValue>(initialValue)
