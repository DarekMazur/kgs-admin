import { RootState, setGlobalUser, switchIsLoading, useGetUsersQuery } from '../../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, MouseEvent } from 'react'
import { Button } from '@mui/material'
import { useAuth } from '../../../utils/providers/AuthProvider.tsx'

const Home = () => {
  const { data: users, isLoading: usersLoading } = useGetUsersQuery()
  const dispatch = useDispatch()
  const isLoading = useSelector<RootState>((state) => state.isLoading)
  const { logout } = useAuth()

  useEffect(() => {
    dispatch(switchIsLoading(usersLoading))
  }, [usersLoading])

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    logout()
    dispatch(setGlobalUser(null))
  }

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h3>Welcome</h3>
          <Button type="button" variant="contained" color="primary" onClick={handleLogout}>
            Wyloguj
          </Button>
          <ul>
            {users
              ? users.map((user) => (
                  <li key={user.id}>
                    {user.username} ({user.email}) - {user.id}
                  </li>
                ))
              : null}
          </ul>
        </>
      )}
    </>
  )
}

export default Home
