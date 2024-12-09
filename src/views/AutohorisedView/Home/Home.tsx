import { RootState, switchIsLoading, useGetUsersQuery } from '../../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import Loader from '../../../components/Loader/Loader.tsx'
import { IUser } from '../../../utils/types.ts'

const Home = () => {
  const { isLoading: usersLoading } = useGetUsersQuery()
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((store) => store.globalUser)
  const dispatch = useDispatch()
  const isLoading = useSelector<RootState>((state) => state.isLoading)

  useEffect(() => {
    dispatch(switchIsLoading(usersLoading))
  }, [usersLoading])

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
              </Box>
            </Paper>
          ) : null}
        </>
      )}
    </>
  )
}

export default Home
