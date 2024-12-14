import { Box, List } from '@mui/material'
import { IMessage } from '../../utils/types.ts'
import { FC } from 'react'
import MessageListItem from '../MessageListItem/MessageListItem.tsx'

const MessagesList: FC<{ messages: IMessage[]; handleChoseMessage: (id: string) => void }> = ({
  messages,
  handleChoseMessage
}) => {
  return (
    <Box>
      <List sx={{ height: '500px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <MessageListItem
            key={message.id}
            message={message}
            handleChoseMessage={handleChoseMessage}
            isLast={index + 1 >= messages.length}
          />
        ))}
      </List>
    </Box>
  )
}

export default MessagesList
