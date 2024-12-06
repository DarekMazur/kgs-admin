import { RootState, switchIsLoading, useGetUsersQuery } from '../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const AuthorisedView = () => {
  const { data: users, isLoading: usersLoading } = useGetUsersQuery()
  const dispatch = useDispatch()
  const isLoading = useSelector<RootState>((state) => state.isLoading)

  useEffect(() => {
    dispatch(switchIsLoading(usersLoading))
  }, [usersLoading])

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h3>Welcome</h3>
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

export default AuthorisedView
