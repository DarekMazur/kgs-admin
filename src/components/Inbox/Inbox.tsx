import { Box, List, Typography } from '@mui/material'
import { IUser } from '../../utils/types.ts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { FC } from 'react'
import MessageListItem from '../MessageListItem/MessageListItem.tsx'

const Inbox: FC<{ handleChoseMessage: (id: string) => void }> = ({ handleChoseMessage }) => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((state) => state.globalUser)

  return (
    <>
      {globalUser ? (
        <Box sx={{ width: '35%' }}>
          <List sx={{ height: '600px', overflowY: 'auto' }}>
            {globalUser.messages.inbox.map((message, index) => (
              <MessageListItem
                key={message.id}
                message={message}
                handleChoseMessage={handleChoseMessage}
                isLast={index + 1 >= globalUser.messages.inbox.length}
              />
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
