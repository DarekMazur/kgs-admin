import { Link, Typography } from '@mui/material'

const UnauthorisedUser = () => {
  const handleClick = () => {
    localStorage.removeItem('jwt')
  }
  return (
    <>
      <Typography variant="h2">Twoje konto nie posiada odpowiednich uprawnień</Typography>
      <Typography variant="subtitle2">
        Jeśli uważasz, że to pomyłka, skontaktuj się z administratorem serwisu.
      </Typography>
      <Link href="/" onClick={handleClick}>
        Wróć
      </Link>
    </>
  )
}

export default UnauthorisedUser
