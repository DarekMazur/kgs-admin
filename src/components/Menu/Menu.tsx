import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { Fragment, useState } from 'react'
import { IUser } from '../../utils/types.ts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import PersonIcon from '@mui/icons-material/Person'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import GroupIcon from '@mui/icons-material/Group'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import BlockIcon from '@mui/icons-material/Block'
import { avatarStyles } from './Menu.styles.ts'

const menuItems = [
  {
    icon: <PersonIcon />,
    title: 'Profil'
  },
  { icon: <ExitToAppIcon />, title: 'Wyloguj' },
  { icon: null, title: null },
  { icon: <GroupIcon />, title: 'Użytkownicy' },
  { icon: <QuestionAnswerIcon />, title: 'Wpisy' },
  { icon: <BlockIcon />, title: 'Zablokowani' }
]

const Menu = () => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((state) => state.globalUser)
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setIsOpen(newOpen)
  }

  return (
    <>
      {sessionStorage.getItem('auth') === 'true' && globalUser ? (
        <AppBar position="static" component="div">
          <Avatar
            alt={globalUser.username as string}
            src={globalUser.avatar}
            sx={avatarStyles}
            onClick={() => setIsOpen(true)}
          />
          <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
            <Box
              component="nav"
              sx={{ width: 250, mt: '4rem' }}
              role="presentation"
              onClick={toggleDrawer(false)}
            >
              <List>
                {menuItems.map((item) => (
                  <Fragment key={item.title}>
                    {item.icon ? (
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    ) : (
                      <Divider />
                    )}
                  </Fragment>
                ))}
              </List>
            </Box>
          </Drawer>
        </AppBar>
      ) : null}
    </>
  )
}

export default Menu
