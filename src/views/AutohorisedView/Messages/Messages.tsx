import { Box, ButtonGroup, Container, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { RootState, setGlobalUser } from '../../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { IMessage, IUser } from '../../../utils/types.ts'
import { formatDate } from '../../../utils/helpers/formatDate.ts'
import { useState } from 'react'
import InboxIcon from '@mui/icons-material/Inbox'
import EmailIcon from '@mui/icons-material/Email'
import DeleteIcon from '@mui/icons-material/Delete'
import Inbox from '../../../components/Inbox/Inbox.tsx'

const Messages = () => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((state) => state.globalUser)
  const [openMessage, setOpenMessage] = useState<IMessage | null>(null)
  const dispatch = useDispatch()

  const handleReadSwitch = (id: string) => {
    if (globalUser) {
      const message = globalUser.messages.inbox.find((message) => message.id === id)

      if (message) {
        const messages = {
          inbox: [
            ...globalUser.messages.inbox.filter((message) => message.id !== id),
            { ...message, openedTime: message.openedTime ? null : JSON.stringify(new Date()) }
          ],
          sent: [...globalUser.messages.sent]
        }

        const updatedUser = { ...globalUser, messages }

        dispatch(setGlobalUser(updatedUser))
      }
    }
  }

  const handleDelete = (id: string) => {
    if (globalUser) {
      const messages = {
        inbox: [...globalUser.messages.inbox.filter((message) => message.id !== id)],
        sent: [...globalUser.messages.sent]
      }

      const updatedUser = { ...globalUser, messages }

      dispatch(setGlobalUser(updatedUser))
    }
  }

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
        <Container component="main" maxWidth={false} sx={{ p: '2rem' }}>
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
            <Inbox handleChoseMessage={handleChoseMessage} />
            {openMessage ? (
              <Box sx={{ width: '65%', height: '400px' }}>
                <Typography variant="body2" sx={{ width: '100%', textAlign: 'right' }}>
                  {formatDate(new Date(openMessage.sendTime), 'full')}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  Od: {openMessage.sender.username}
                  <ButtonGroup disableElevation variant="contained" sx={{ mt: '1rem', mb: '2rem' }}>
                    <Tooltip
                      title={
                        openMessage.openedTime
                          ? 'Oznacz jako nieprzeczytane'
                          : 'Oznacz jako przeczytane'
                      }
                    >
                      <IconButton onClick={() => handleReadSwitch(openMessage.id)}>
                        <EmailIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Usuń">
                      <IconButton onClick={() => handleDelete(openMessage.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ButtonGroup>
                </Box>
                <Typography variant="h3">{openMessage.header}</Typography>
                {openMessage.message}
              </Box>
            ) : (
              <Box
                sx={{
                  width: '65%',
                  height: '400px',
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
