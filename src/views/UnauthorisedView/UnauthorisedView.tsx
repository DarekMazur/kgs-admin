import Login from './Login/Login.tsx'
import { Route, Routes } from 'react-router-dom'
import UnauthorisedUser from './UnauthorisedUser/UnauthorisedUser.tsx'
import Home from './Home/Home.tsx'

const UnauthorisedView = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorised" element={<UnauthorisedUser />} />
    </Routes>
  )
}

export default UnauthorisedView
