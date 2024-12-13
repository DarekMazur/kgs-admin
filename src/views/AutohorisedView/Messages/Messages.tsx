import { Box, Container, List, ListItem, Typography } from '@mui/material'
import { RootState } from '../../../../store'
import { useSelector } from 'react-redux'
import { IUser } from '../../../utils/types.ts'
import { formatDate } from '../../../utils/helpers/formatDate.ts'

const Messages = () => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((state) => state.globalUser)

  return (
    <>
      {globalUser ? (
        <Container component="main">
          <Typography variant="h3">Messages view</Typography>
          <List>
            {globalUser.messages.map((message) => (
              <ListItem key={message.id} sx={{ gap: '1rem' }}>
                <Box>
                  <Typography>{message.openedTime ? 'Przeczytane' : 'Nieprzeczytane'}</Typography>
                  {message.openedTime ? (
                    <Typography>{formatDate(new Date(message.openedTime))}</Typography>
                  ) : null}
                </Box>
                <Box>
                  <Typography variant={'h3'}>{message.header}</Typography>
                  {message.message}
                </Box>
              </ListItem>
            ))}
          </List>
        </Container>
      ) : (
        <Typography variant="h3" color="error">
          Nie można załadować danych...
        </Typography>
      )}
    </>
  )
}

export default Messages
