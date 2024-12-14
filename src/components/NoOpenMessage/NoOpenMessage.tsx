import InboxIcon from '@mui/icons-material/Inbox'
import { Box, Typography } from '@mui/material'
import { IUser } from '../../utils/types.ts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

const NoOpenMessage = () => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((state) => state.globalUser)

  return (
    <>
      {globalUser ? (
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
      ) : (
        <Typography variant="h3" color="error">
          Nie można załadować danych...
        </Typography>
      )}
    </>
  )
}

export default NoOpenMessage
