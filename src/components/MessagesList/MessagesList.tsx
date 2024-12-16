import { Box, List } from '@mui/material'
import { IMessage } from '../../utils/types.ts'
import { FC } from 'react'
import MessageListItem from '../MessageListItem/MessageListItem.tsx'

const MessagesList: FC<{
  messages: IMessage[]
  currentId: string | null
  handleChoseMessage: (id: string) => void
}> = ({ messages, currentId, handleChoseMessage }) => {
  const messagesList = structuredClone(messages).sort(
    (a, b) => new Date(b.sendTime).getTime() - new Date(a.sendTime).getTime()
  )
  const currentMessage = messages.find((message) => message.id === currentId)

  return (
    <Box>
      <List sx={{ height: '500px', overflowY: 'auto' }}>
        {messagesList.map((message, index) => (
          <MessageListItem
            key={message.id}
            message={message}
            handleChoseMessage={handleChoseMessage}
            isLast={index + 1 >= messagesList.length}
            isCurrent={!!currentMessage && currentMessage.id === message.id}
          />
        ))}
      </List>
    </Box>
  )
}

export default MessagesList
