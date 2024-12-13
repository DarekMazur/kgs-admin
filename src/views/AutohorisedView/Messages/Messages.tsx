import { Box, Container, Divider, List, ListItem, Paper, Typography } from '@mui/material'
import { RootState, setGlobalUser } from '../../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { IMessage, IUser } from '../../../utils/types.ts'
import { formatDate } from '../../../utils/helpers/formatDate.ts'
import { useState } from 'react'
import InboxIcon from '@mui/icons-material/Inbox'

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
            <Box sx={{ width: '35%' }}>
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
                        sx={{ fontWeight: message.openedTime ? 300 : 700, fontSize: '0.8rem' }}
                      >
                        {formatDate(new Date(message.sendTime), 'short')}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="h3"
                        sx={{ fontSize: '0.8rem', textWrap: 'nowrap' }}
                      >
                        {message.header}
                      </Typography>
                      {index + 1 < globalUser.messages.inbox.length ? (
                        <Divider sx={{ my: '0.5rem', width: '100%' }} />
                      ) : null}
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Box>
            {openMessage ? (
              <Box sx={{ width: '65%', height: '400px' }}>
                <Typography variant="h3">{openMessage.header}</Typography>
                <Typography variant="body1">
                  {formatDate(new Date(openMessage.sendTime), 'full')}
                </Typography>
                {openMessage.message}
              </Box>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <InboxIcon color="secondary" sx={{ width: '150px', height: '150px' }} />
                <Typography variant="h3">
                  Witaj, {globalUser.firstName ? globalUser.firstName : globalUser.username}!
                </Typography>
                <Typography variant="body1">
                  {globalUser.messages.inbox.length > 0
                    ? `masz ${globalUser.messages.inbox.length} wiadomości${globalUser.messages.inbox.filter((message) => !message.openedTime).length > 0 ? `, w tym ${globalUser.messages.inbox.filter((message) => !message.openedTime).length} nieprzeczytanych` : ''}`
                    : 'nie masz żadnych wiadomości'}
                </Typography>
              </Box>
            )}
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
