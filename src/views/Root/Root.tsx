import UnauthorisedView from '../UnauthorisedView/UnauthorisedView.tsx'
import { RootState, switchIsLoading, useGetUsersQuery } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Header from '../../components/Header/Header.tsx'
import Footer from '../../components/Footer/Footer.tsx'
import { IUser } from '../../utils/types.ts'
import { jwtDecode } from 'jwt-decode'

const Root = () => {
  const { data: users, isLoading: usersLoading } = useGetUsersQuery()
  const dispatch = useDispatch()
  const isLoading = useSelector<RootState>((state) => state.isLoading)
  const globalUser = useSelector<RootState>((state) => state.globalUser)
  const [isAuthorised, setIsAuthorised] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('jwt')

    if (token) {
      const decoded = jwtDecode(token)
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      decoded.role_id < 3 ? setIsAuthorised(true) : setIsAuthorised(false)
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('jwt') && globalUser && (globalUser as IUser).role.id < 3) {
      setIsAuthorised(true)
    }
  }, [globalUser])

  useEffect(() => {
    dispatch(switchIsLoading(usersLoading))
  }, [usersLoading])

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Header />
          {!isAuthorised ? (
            <UnauthorisedView />
          ) : (
            <>
              <h3>Welcome</h3>
              <ul>{users ? users.map((user) => <li key={user.id}>{user.username}</li>) : null}</ul>
            </>
          )}
          <Footer />
        </>
      )}
    </>
  )
}

export default Root
