import { Box, Link, Paper, Typography } from '@mui/material'
import { useAuth } from '../../../utils/hooks/useAuth.tsx'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const UnauthorisedUser = () => {
  const { logout } = useAuth()

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem', m: '2rem' }}
      >
        <ErrorOutlineIcon color="error" fontSize="large" />
        <Typography variant="h2" color="error" sx={{ fontWeight: 700 }}>
          Twoje konto nie posiada odpowiednich uprawnień
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          p: '2rem',
          m: '3rem'
        }}
      >
        <Typography variant="subtitle1">
          Jeśli uważasz, że to pomyłka, skontaktuj się z administratorem serwisu.
        </Typography>
        <Link href="/login" color="secondary" onClick={logout}>
          Wyloguj
        </Link>
      </Box>
    </Paper>
  )
}

export default UnauthorisedUser
