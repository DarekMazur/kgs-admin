import Header from '../../components/Header/Header.tsx'
import Footer from '../../components/Footer/Footer.tsx'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../../utils/providers/AuthProvider.tsx'
import PrivateRoutes from '../../utils/providers/PrivateRoutes.tsx'
import Home from '../AutohorisedView/Home/Home.tsx'
import Login from '../UnauthorisedView/Login/Login.tsx'
import UnauthorizedHome from '../UnauthorisedView/Home/Home.tsx'
import UnauthorisedUser from '../UnauthorisedView/UnauthorisedUser/UnauthorisedUser.tsx'
import TestView from '../AutohorisedView/TestView/TestView.tsx'
import { useGetUsersQuery } from '../../../store'

const Root = () => {
  const { data: users } = useGetUsersQuery()
  return (
    <>
      <AuthProvider>
        <>
          <Header />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/admin" element={<Home />} />
              <Route path="/test" element={<TestView list={users ? users : []} />} />
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
