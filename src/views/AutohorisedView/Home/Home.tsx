import { RootState, setGlobalUser, switchIsLoading, useGetUsersQuery } from '../../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, MouseEvent } from 'react'
import { Box, Button, Paper, Typography, List, ListItem } from '@mui/material'
import { useAuth } from '../../../utils/hooks/useAuth.tsx'
import Loader from '../../../components/Loader/Loader.tsx'
import { IUser } from '../../../utils/types.ts'

const Home = () => {
  const { data: users, isLoading: usersLoading } = useGetUsersQuery()
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((store) => store.globalUser)
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
        <Loader />
      ) : (
        <>
          {globalUser ? (
            <Paper elevation={0}>
              <Box sx={{ flexGrow: 1, m: '2rem 3rem' }}>
                <Typography component="h3" variant="h2" color="secondary">
                  Witaj, {globalUser.username}
                </Typography>
                <Button type="button" variant="contained" color="primary" onClick={handleLogout}>
                  Wyloguj
                </Button>
                <List>
                  {users
                    ? users.map((user) => (
                        <ListItem key={user.id}>
                          {user.username} ({user.email}) - {user.id}
                        </ListItem>
                      ))
                    : null}
                </List>
              </Box>
            </Paper>
          ) : null}
        </>
      )}
    </>
  )
}

export default Home
