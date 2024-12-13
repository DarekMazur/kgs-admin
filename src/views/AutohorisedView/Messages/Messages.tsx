import {
  Avatar,
  Box,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  Paper,
  Tooltip,
  Typography
} from '@mui/material'
import { RootState, setGlobalUser } from '../../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { IMessage, IUser } from '../../../utils/types.ts'
import { formatDate } from '../../../utils/helpers/formatDate.ts'
import { useState } from 'react'
import InboxIcon from '@mui/icons-material/Inbox'
import { theme } from '../../../utils/theme.tsx'
import EmailIcon from '@mui/icons-material/Email'
import DeleteIcon from '@mui/icons-material/Delete'

const Messages = () => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((state) => state.globalUser)
  const [openMessage, setOpenMessage] = useState<IMessage | null>(null)
  const dispatch = useDispatch()

  const handleReadSwitch = (id: string) => {
    if (globalUser) {
      const message = globalUser.messages.inbox.find((message) => message.id === id)

      if (message) {
        let messages = { ...globalUser.messages }

        messages = {
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
            <Box sx={{ width: '35%' }}>
              <List sx={{ height: '600px', overflowY: 'auto' }}>
                {globalUser.messages.inbox.map((message, index) => (
                  <ListItem
                    key={message.id}
                    sx={{ gap: '1rem' }}
                    onClick={() => handleChoseMessage(message.id)}
                  >
                    <Box sx={{ width: '100%', position: 'relative' }}>
                      <Typography
                        variant="body2"
                        component="p"
                        sx={{
                          fontWeight: message.openedTime ? 300 : 700,
                          fontSize: '0.8rem',
                          position: 'absolute',
                          top: '-18px',
                          right: '5px'
                        }}
                      >
                        {formatDate(new Date(message.sendTime), 'short')}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: '0.6rem' }}>
                        <Avatar sx={{ backgroundColor: theme.palette.secondary.main }}>
                          {message.sender.username.slice(0, 1)}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="body2"
                            component="p"
                            sx={{
                              fontWeight: message.openedTime ? 300 : 700,
                              fontSize: '0.8rem'
                            }}
                          >
                            {message.sender.role} ({message.sender.username})
                          </Typography>
                          <Typography
                            variant="body2"
                            component="h3"
                            sx={{ fontSize: '0.8rem', textWrap: 'nowrap' }}
                          >
                            {message.header}
                          </Typography>
                        </Box>
                      </Box>
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
                      <IconButton>
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
