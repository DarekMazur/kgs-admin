import {
  AppBar,
  Avatar,
  Badge,
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
import EmailIcon from '@mui/icons-material/Email'
import HomeIcon from '@mui/icons-material/Home'
import { avatarStyles } from './Menu.styles.ts'
import { useAuth } from '../../utils/hooks/useAuth.tsx'
import { useNavigate } from 'react-router'

const Menu = () => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((state) => state.globalUser)
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const menuItems = [
    {
      icon: <PersonIcon />,
      title: 'Profil',
      action: () => {
        navigate('/admin/profile')
      }
    },
    {
      icon: (
        <Badge
          badgeContent={
            globalUser ? globalUser.messages.filter((message) => message.openedTime).length : 0
          }
          color="primary"
        >
          <EmailIcon />
        </Badge>
      ),
      title: 'Wiadomości',
      action: () => {}
    },
    { icon: <ExitToAppIcon />, title: 'Wyloguj', action: logout },
    { icon: null, title: null, action: () => {} },
    {
      icon: <HomeIcon />,
      title: 'Strona główna',
      action: () => {
        navigate('/admin')
      }
    },
    {
      icon: <GroupIcon />,
      title: 'Użytkownicy',
      action: () => {
        navigate('/admin/users')
      }
    },
    {
      icon: <QuestionAnswerIcon />,
      title: 'Wpisy',
      action: () => {
        navigate('/admin/posts')
      }
    },
    {
      icon: <BlockIcon />,
      title: 'Zablokowani',
      action: () => {
        navigate('/admin/users/blocked')
      }
    }
  ]

  const toggleDrawer = (newOpen: boolean) => () => {
    setIsOpen(newOpen)
  }

  return (
    <>
      {sessionStorage.getItem('auth') === 'true' && globalUser ? (
        <AppBar position="static" component="div">
          <Box sx={{ m: '1rem 2rem' }}>
            <Badge
              badgeContent={
                globalUser ? globalUser.messages.filter((message) => message.openedTime).length : 0
              }
              color="secondary"
              sx={{
                '& .MuiBadge-badge': {
                  color: 'background.default',
                  fontWeight: '700'
                }
              }}
            >
              <Avatar
                alt={globalUser.username as string}
                src={globalUser.avatar}
                sx={avatarStyles}
                onClick={() => setIsOpen(true)}
              />
            </Badge>
          </Box>
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
                        <ListItemButton component="a" onClick={() => item.action()}>
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
