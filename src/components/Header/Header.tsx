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
  ListItemText,
  Paper,
  Typography
} from '@mui/material'
import Logo from '../../assets/images/logoFullW.png'
import { headerIdentityBox, headerLogo, headerStyles, avatarStyles } from './Header.styles.ts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { IUser } from '../../utils/types.ts'
import { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import GroupIcon from '@mui/icons-material/Group'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import BlockIcon from '@mui/icons-material/Block'

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

const Header = () => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((state) => state.globalUser)
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setIsOpen(newOpen)
  }

  return (
    <>
      <Paper component="header" sx={headerStyles}>
        <Box component="img" sx={headerLogo} alt="Logo" src={Logo} />
        <Divider orientation="vertical" variant="middle" flexItem />
        <Box component="div" sx={headerIdentityBox}>
          <Typography variant="h1">Korona Gór Świętokrzyskich</Typography>
          <Typography variant="h2">Panel administracyjny</Typography>
        </Box>
      </Paper>
      {sessionStorage.getItem('auth') === 'true' && globalUser ? (
        <AppBar position="static">
          <Avatar
            alt={globalUser.username as string}
            src={globalUser.avatar}
            sx={avatarStyles}
            onClick={() => setIsOpen(true)}
          />
          <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
            <Box sx={{ width: 250, mt: '4rem' }} role="presentation" onClick={toggleDrawer(false)}>
              <List>
                {menuItems.map((item) => (
                  <>
                    {item.icon ? (
                      <ListItem key={item.title} disablePadding>
                        <ListItemButton>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    ) : (
                      <Divider />
                    )}
                  </>
                ))}
              </List>
              {/*<Divider />*/}
              {/*<List>*/}
              {/*  {['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
              {/*    <ListItem key={text} disablePadding>*/}
              {/*      <ListItemButton>*/}
              {/*        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
              {/*        <ListItemText primary={text} />*/}
              {/*      </ListItemButton>*/}
              {/*    </ListItem>*/}
              {/*  ))}*/}
              {/*</List>*/}
            </Box>
          </Drawer>
        </AppBar>
      ) : null}
    </>
  )
}

export default Header
