import { Button, FormControl, FormLabel, Paper, TextField } from '@mui/material'
import { theme } from '../../utils/theme.tsx'

const styledFormWrapper = {
  p: '2rem 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}

const styledLabel = {
  fontFamily: '"Russo One", sans-serif;',
  fontSize: '2rem',
  fontWeight: 700
}

const styledForm = {
  m: '3rem 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '700px'
}

const styledInput = {
  border: 'none',
  fontSize: '1.5rem',
  mb: '3rem',
  width: '100%',
  maxWidth: '400px'
}

const styledSubmitButton = {
  fontFamily: '"Russo One", sans-serif;',
  width: '10rem',
  height: '3rem',
  m: '1rem 1.2rem',
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.primary.contrastText,
  alignSelf: 'self-end'
}

const UnauthorisedView = () => {
  return (
    <Paper elevation={3} sx={styledFormWrapper}>
      <FormLabel sx={styledLabel}>Zaloguj się</FormLabel>
      <FormControl sx={styledForm}>
        <TextField label={'Email'} variant="filled" required type="email" sx={styledInput} />
        <TextField label={'Hasło'} variant="filled" required type="password" sx={styledInput} />
        <Button
          disabled={false}
          variant="contained"
          type="submit"
          sx={styledSubmitButton}
          onClick={() => {}}
        >
          Zaloguj
        </Button>
      </FormControl>
    </Paper>
  )
}

export default UnauthorisedView
