import { Link, Typography } from '@mui/material'
import { useAuth } from '../../../utils/providers/AuthProvider.tsx'

const UnauthorisedUser = () => {
  const { logout } = useAuth()

  return (
    <>
      <Typography variant="h2">Twoje konto nie posiada odpowiednich uprawnień</Typography>
      <Typography variant="subtitle2">
        Jeśli uważasz, że to pomyłka, skontaktuj się z administratorem serwisu.
      </Typography>
      <Link href="/login" onClick={logout}>
        Wróć
      </Link>
    </>
  )
}

export default UnauthorisedUser
