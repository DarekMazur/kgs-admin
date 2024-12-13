import { Box, List } from '@mui/material'
import { IMessage } from '../../utils/types.ts'
import { FC } from 'react'
import MessageListItem from '../MessageListItem/MessageListItem.tsx'

const MessagesList: FC<{ messages: IMessage[]; handleChoseMessage: (id: string) => void }> = ({
  messages,
  handleChoseMessage
}) => {
  return (
    <Box sx={{ width: '35%' }}>
      <List sx={{ height: '600px', overflowY: 'auto' }}>
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
