import Login from './Login/Login.tsx'
import { Route, Routes } from 'react-router-dom'
import UnauthorisedUser from './UnauthorisedUser/UnauthorisedUser.tsx'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setGlobalUser } from '../../../store'

const UnauthorisedView = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.removeItem('jwt')
    dispatch(setGlobalUser(null))
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/unauthorised" element={<UnauthorisedUser />} />
    </Routes>
  )
}

export default UnauthorisedView
