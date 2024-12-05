import { Box, Button, TextField } from '@mui/material'
import { theme } from '../../utils/theme.tsx'

const UnauthorisedView = () => {
  return (
    <Box
      component="form"
      sx={{
        m: '3rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <TextField
        label={'Email'}
        variant="filled"
        required
        type="email"
        sx={{
          border: 'none',
          fontSize: '1.5rem',
          mb: '3rem'
        }}
      />
      <TextField label={'Hasło'} variant="filled" required type="password" />
      <Button
        disabled={false}
        variant="contained"
        type="submit"
        sx={{
          fontFamily: '"Russo One", sans-serif;',
          width: '10rem',
          height: '3rem',
          m: '1rem 1.2rem',
          color: theme.palette.secondary.contrastText,
          backgroundColor: theme.palette.primary.contrastText,
          alignSelf: 'self-end'
        }}
        onClick={() => {}}
      >
        Zaloguj
      </Button>
    </Box>
  )
}

export default UnauthorisedView
