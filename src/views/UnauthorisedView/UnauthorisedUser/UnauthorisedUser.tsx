import { Link, Typography } from '@mui/material'

const UnauthorisedUser = () => {
  return (
    <>
      <Typography variant="h2">Twoje konto nie posiada odpowiednich uprawnień</Typography>
      <Typography variant="subtitle2">
        Jeśli uważasz, że to pomyłka, skontaktuj się z administratorem serwisu.
      </Typography>
      <Link href="/">Wróć</Link>
    </>
  )
}

export default UnauthorisedUser
