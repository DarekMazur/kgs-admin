import Login from '../Login/Login.tsx'
import { Route, Routes } from 'react-router-dom'

const UnauthorisedView = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  )
}

export default UnauthorisedView
