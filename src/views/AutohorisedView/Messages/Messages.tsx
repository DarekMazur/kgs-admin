import { Box, Container, Paper, Tabs, Typography } from '@mui/material'
import {
  RootState,
  setGlobalUser,
  useDeleteMessagesMutation,
  useUpdateMessagesMutation
} from '../../../../store'
import { useDispatch, useSelector } from 'react-redux'
import { IMessage, IUser } from '../../../utils/types.ts'
import { SyntheticEvent, useEffect, useState } from 'react'
import MessagesList from '../../../components/MessagesList/MessagesList.tsx'
import Message from '../../../components/Message/Message.tsx'
import CustomTab from '../../../components/CustomTab/CustomTab.tsx'
import TabPanel from '../../../components/TabPanel/TabPanel.tsx'
import { useSearchParams } from 'react-router-dom'

const Messages = () => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((state) => state.globalUser)
  const [openMessage, setOpenMessage] = useState<IMessage | null>(null)
  const [value, setValue] = useState(0)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [deleteMessage] = useDeleteMessagesMutation()
  const [updateMessage] = useUpdateMessagesMutation()

  useEffect(() => {
    setSearchParams({ box: 'inbox' })
  }, [])

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    if (newValue === 1) {
      setSearchParams({ box: 'sent' })
    } else {
      setSearchParams({ box: 'inbox' })
    }

    setOpenMessage(null)
    setValue(newValue)
  }

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

        updateMessage({ ...message, openedTime: message.openedTime ? null : new Date() })

        const updatedUser = { ...globalUser, messages }

        dispatch(setGlobalUser(updatedUser))
      }
    }
  }

  const handleDelete = (id: string) => {
    deleteMessage(id)

    if (globalUser) {
      const messages = {
        inbox: [...globalUser.messages.inbox.filter((message) => message.id !== id)],
        sent: [...globalUser.messages.sent]
      }

      const updatedUser = { ...globalUser, messages }
      setOpenMessage(null)

      dispatch(setGlobalUser(updatedUser))
    }
  }

  const handleChoseMessage = (id: string) => {
    if (globalUser) {
      const message =
        globalUser.messages.inbox.find((message) => message.id === id) ||
        globalUser.messages.sent.find((message) => message.id === id)

      if (message && searchParams.get('box') === 'inbox') {
        let messages = { ...globalUser.messages }

        if (message && !message.openedTime) {
          messages = {
            inbox: [
              ...globalUser.messages.inbox.filter((message) => message.id !== id),
              { ...message, openedTime: JSON.stringify(new Date()) }
            ],
            sent: [...globalUser.messages.sent]
          }

          if (globalUser.messages.inbox.find((message) => message.id === id)) {
            updateMessage({ ...message, openedTime: new Date() })
          }
        }

        const updatedUser = { ...globalUser, messages }

        dispatch(setGlobalUser(updatedUser))
      }

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
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
              >
                <CustomTab label="Odebrane" />
                <CustomTab label="Wysłane" />
              </Tabs>
              <TabPanel value={value} index={0}>
                <MessagesList
                  messages={globalUser.messages.inbox}
                  currentId={openMessage ? openMessage.id : null}
                  handleChoseMessage={handleChoseMessage}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <MessagesList
                  messages={globalUser.messages.sent}
                  currentId={openMessage ? openMessage.id : null}
                  handleChoseMessage={handleChoseMessage}
                />
              </TabPanel>
            </Box>
            <Message
              openMessage={openMessage}
              handleDelete={handleDelete}
              handleReadSwitch={handleReadSwitch}
              version={searchParams.get('box') ?? 'inbox'}
            />
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
