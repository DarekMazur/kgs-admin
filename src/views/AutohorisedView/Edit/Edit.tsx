import { Container, Typography } from '@mui/material'
import { IUser } from '../../../utils/types.ts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'

const Edit = () => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((state) => state.globalUser)
  return (
    <>
      {globalUser ? (
        <Container maxWidth={false} component="main">
          <Typography variant="h3">{globalUser.username}</Typography>
        </Container>
      ) : (
        <Typography variant="h3" color="error">
          Nie można załadować danych...
        </Typography>
      )}
    </>
  )
}

export default Edit
