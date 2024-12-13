import { Box, Container, Divider, List, ListItem, Paper, Typography } from '@mui/material'
import { RootState, setGlobalUser } from '../../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { IMessage, IUser } from '../../../utils/types.ts'
import { formatDate } from '../../../utils/helpers/formatDate.ts'
import { useState } from 'react'

const Messages = () => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((state) => state.globalUser)
  const [openMessage, setOpenMessage] = useState<IMessage | null>(null)
  const dispatch = useDispatch()

  const handleChoseMessage = (id: string) => {
    if (globalUser) {
      const message =
        globalUser.messages.inbox.find((message) => message.id === id) ||
        globalUser.messages.sent.find((message) => message.id === id)

      let messages = { ...globalUser.messages }

      if (message && !message.openedTime) {
        messages = {
          inbox: [
            ...globalUser.messages.inbox.filter((message) => message.id !== id),
            { ...message, openedTime: JSON.stringify(new Date()) }
          ],
          sent: [...globalUser.messages.sent]
        }
      }

      const updatedUser = { ...globalUser, messages }

      dispatch(setGlobalUser(updatedUser))

      setOpenMessage(message ? message : null)
    }
  }

  return (
    <>
      {globalUser ? (
        <Container component="main" sx={{ p: '2rem' }}>
          <Typography variant="h3" sx={{ width: '100%', textAlign: 'center' }}>
            Wiadomości
          </Typography>
          <Paper
            sx={{
              m: '1rem',
              p: '1rem',
              display: 'flex',
              gap: '1rem',
              height: 'calc(600px + 2rem)'
            }}
          >
            <Box>
              <List sx={{ height: '600px', overflowY: 'auto' }}>
                {globalUser.messages.inbox.map((message, index) => (
                  <ListItem
                    key={message.id}
                    sx={{ gap: '1rem' }}
                    onClick={() => handleChoseMessage(message.id)}
                  >
                    <Box sx={{ width: '100%' }}>
                      <Typography
                        variant="body2"
                        component="p"
                        sx={{ fontWeight: message.openedTime ? 300 : 700 }}
                      >
                        {formatDate(new Date(message.sendTime))}
                      </Typography>
                      <Typography variant="body2" component="h3">
                        {message.header}
                      </Typography>
                      {index + 1 < globalUser.messages.inbox.length ? (
                        <Divider sx={{ my: '1rem', width: '100%' }} />
                      ) : null}
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
            {openMessage ? (
              <Box sx={{ width: '60%', height: '400px' }}>
                <Typography variant="h3">{openMessage.header}</Typography>
                {openMessage.message}
              </Box>
            ) : null}
          </Paper>
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
