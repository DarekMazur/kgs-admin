import { Box, ButtonGroup, IconButton, Tooltip, Typography } from '@mui/material'
import { formatDate } from '../../utils/helpers/formatDate.ts'
import EmailIcon from '@mui/icons-material/Email'
import DeleteIcon from '@mui/icons-material/Delete'
import { FC } from 'react'
import { IMessage, IUser } from '../../utils/types.ts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import NoOpenMessage from '../NoOpenMessage/NoOpenMessage.tsx'

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
            <NoOpenMessage />
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
