import { Route, Routes } from 'react-router-dom'
import Home from '../Home/Home.tsx'

const AuthorisedView = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  )
}

export default AuthorisedView
