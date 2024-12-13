import { Avatar, Box, Divider, List, ListItem, Typography } from '@mui/material'
import { formatDate } from '../../utils/helpers/formatDate.ts'
import { theme } from '../../utils/theme.tsx'
import { IUser } from '../../utils/types.ts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { FC } from 'react'

const Inbox: FC<{ handleChoseMessage: (id: string) => void }> = ({ handleChoseMessage }) => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((state) => state.globalUser)

  return (
    <>
      {globalUser ? (
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
      ) : (
        <Typography variant="h3" color="error">
          Nie można załadować danych...
        </Typography>
      )}
    </>
  )
}

export default Inbox
