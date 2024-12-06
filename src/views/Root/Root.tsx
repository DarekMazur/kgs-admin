import Header from '../../components/Header/Header.tsx'
import Footer from '../../components/Footer/Footer.tsx'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../../utils/providers/AuthProvider.tsx'
import PrivateRoutes from '../../utils/providers/PrivateRoutes.tsx'
import Home from '../AutohorisedView/Home/Home.tsx'
import Login from '../UnauthorisedView/Login/Login.tsx'
import UnauthorizedHome from '../UnauthorisedView/Home/Home.tsx'

const Root = () => {
  return (
    <>
      <Header />
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/admin" element={<Home />} />
          </Route>
          <Route path="/" element={<UnauthorizedHome />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
      <Footer />
    </>
  )
}

export default Root
