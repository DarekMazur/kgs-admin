import Header from '../../components/Header/Header.tsx'
import Footer from '../../components/Footer/Footer.tsx'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../../utils/providers/AuthProvider.tsx'
import PrivateRoutes from '../../utils/providers/PrivateRoutes.tsx'
import Home from '../AutohorisedView/Home/Home.tsx'
import Login from '../UnauthorisedView/Login/Login.tsx'
import UnauthorizedHome from '../UnauthorisedView/Home/Home.tsx'
import UnauthorisedUser from '../UnauthorisedView/UnauthorisedUser/UnauthorisedUser.tsx'
import UserView from '../AutohorisedView/UserView/UserView.tsx'
import Users from '../AutohorisedView/Users/Users.tsx'

const Root = () => {
  return (
    <>
      <AuthProvider>
        <>
          <Header />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/admin" element={<Home />} />
              <Route path="/admin/users/:id" element={<UserView />} />
              <Route path="/admin/users" element={<Users />} />
            </Route>
            <Route path="/" element={<UnauthorizedHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<UnauthorisedUser />} />
          </Routes>
          <Footer />
        </>
      </AuthProvider>
    </>
  )
}

export default Root
