import { Box, ButtonGroup, IconButton, Tooltip, Typography } from '@mui/material'
import { formatDate } from '../../utils/helpers/formatDate.ts'
import EmailIcon from '@mui/icons-material/Email'
import DeleteIcon from '@mui/icons-material/Delete'
import InboxIcon from '@mui/icons-material/Inbox'
import { FC } from 'react'
import { IMessage, IUser } from '../../utils/types.ts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

const Message: FC<{
  openMessage: IMessage | null
  handleReadSwitch: (id: string) => void
  handleDelete: (id: string) => void
}> = ({ openMessage, handleReadSwitch, handleDelete }) => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((state) => state.globalUser)

  return (
    <>
      {globalUser ? (
        <>
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
        </>
      ) : (
        <Typography variant="h3" color="error">
          Nie można załadować danych...
        </Typography>
      )}
    </>
  )
}

export default Message
