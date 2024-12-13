import { Avatar, Box, Divider, ListItem, Typography } from '@mui/material'
import { formatDate } from '../../utils/helpers/formatDate.ts'
import { theme } from '../../utils/theme.tsx'
import { FC } from 'react'
import { IMessage } from '../../utils/types.ts'

const MessageListItem: FC<{
  message: IMessage
  isLast: boolean
  handleChoseMessage: (id: string) => void
}> = ({ message, isLast, handleChoseMessage }) => {
  return (
    <ListItem key={message.id} sx={{ gap: '1rem' }} onClick={() => handleChoseMessage(message.id)}>
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
        {isLast ? null : <Divider sx={{ my: '0.5rem', width: '100%' }} />}
      </Box>
    </ListItem>
  )
}

export default MessageListItem
