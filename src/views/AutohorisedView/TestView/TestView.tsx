import { Button, List, ListItem } from '@mui/material'
import { MouseEvent } from 'react'
import { setGlobalUser } from '../../../../store'
import { useAuth } from '../../../utils/hooks/useAuth.tsx'
import { useDispatch } from 'react-redux'
import { IUser } from '../../../utils/types.ts'

const TestView = ({ list }: { list: IUser[] }) => {
  const { logout } = useAuth()
  const dispatch = useDispatch()
  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    logout()
    dispatch(setGlobalUser(null))
  }

  return (
    <>
      <Button type="button" variant="contained" color="primary" onClick={handleLogout}>
        Wyloguj
      </Button>
      <List>
        {list
          ? list.map((user) => (
              <ListItem key={user.id}>
                {user.username} ({user.email}) - {user.id}
              </ListItem>
            ))
          : null}
      </List>
    </>
  )
}

export default TestView
