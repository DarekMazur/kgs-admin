import { Box, Link, Paper, Typography } from '@mui/material'
import Logo from '../../assets/images/logoW.png'
import { currentYear } from '../../utils/helpers/getYear'

const Footer = () => {
  return (
    <Paper component="footer" sx={{ padding: '1rem' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box component="img" sx={{ width: 50, margin: '0 1rem' }} alt="Logo" src={Logo} />
        <p>Korona Gór Świętokrzyskich &copy; {currentYear()}</p>
      </Box>
      <Typography align="right">
        by{' '}
        <Link
          href="https://nerdistry.pl"
          color="secondary"
          underline="hover"
          sx={{ fontWeight: 700 }}
        >
          Nerdistry.pl
        </Link>
      </Typography>
    </Paper>
  )
}

export default Footer
