import { Button, FormControl, Paper, TextField } from '@mui/material'
import { theme } from '../../utils/theme.tsx'

const UnauthorisedView = () => {
  return (
    <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <FormControl
        sx={{
          m: '3rem 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '700px'
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
            mb: '3rem',
            width: '100%',
            maxWidth: '400px'
          }}
        />
        <TextField
          label={'Hasło'}
          variant="filled"
          required
          type="password"
          sx={{
            border: 'none',
            fontSize: '1.5rem',
            mb: '3rem',
            width: '100%',
            maxWidth: '400px'
          }}
        />
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
      </FormControl>
    </Paper>
  )
}

export default UnauthorisedView
