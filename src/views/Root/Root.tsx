import UnauthorisedView from '../UnauthorisedView/UnauthorisedView.tsx'
import { RootState } from '../../../store'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header.tsx'
import Footer from '../../components/Footer/Footer.tsx'
import { IUser } from '../../utils/types.ts'
import { jwtDecode } from 'jwt-decode'
import AuthorisedView from '../AutohorisedView/AuthorisedView.tsx'

const Root = () => {
  const globalUser = useSelector<RootState>((state) => state.globalUser)
  const [isAuthorised, setIsAuthorised] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('jwt')

    if (token) {
      const decoded = jwtDecode(token)
      // @ts-ignore
      decoded.role_id < 3 ? setIsAuthorised(true) : setIsAuthorised(false)
    }
  }, [])

  useEffect(() => {
    if (globalUser) {
      if (localStorage.getItem('jwt') && globalUser && (globalUser as IUser).role.id < 3) {
        const token = localStorage.getItem('jwt')
        if (token) {
          const decoded = jwtDecode(token)
          // @ts-ignore
          if (decoded.id === (globalUser as IUser).id) {
            setIsAuthorised(true)
          }
        }
      } else {
        setIsAuthorised(false)
      }
    }
  }, [globalUser])

  return (
    <>
      <Header />
      {!isAuthorised ? <UnauthorisedView /> : <AuthorisedView />}
      <Footer />
    </>
  )
}

export default Root
