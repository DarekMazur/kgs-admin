import { Link, Paper, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const UnauthorizedHome = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('jwt') || sessionStorage.getItem('jwt')) {
      navigate('/admin')
    }
  }, [])

  useEffect(() => {}, [])

  return (
    <Paper
      elevation={0}
      sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography variant="h2">
        <Link
          href="/login"
          color="secondary"
          underline="hover"
          sx={{ fontWeight: 700, fontFamily: '"Russo One", sans-serif;' }}
        >
          Zaloguj się
        </Link>
        , aby kontynuować
      </Typography>
    </Paper>
  )
}

export default UnauthorizedHome
