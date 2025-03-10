import { Box, Divider, Paper, Typography } from '@mui/material'
import Logo from '../../assets/images/logoFullW.png'
import { headerIdentityBox, headerLogo, headerStyles } from './Header.styles.ts'
import Menu from '../Menu/Menu.tsx'

const Header = () => {
  return (
    <>
      <Box>
        <Paper component="header" sx={headerStyles}>
          <Box component="img" sx={headerLogo} alt="Logo" src={Logo} />
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box component="div" sx={headerIdentityBox}>
            <Typography variant="h1">Korona Gór Świętokrzyskich</Typography>
            <Typography variant="h2">Panel administracyjny</Typography>
          </Box>
        </Paper>
        <Menu />
      </Box>
    </>
  )
}

export default Header
