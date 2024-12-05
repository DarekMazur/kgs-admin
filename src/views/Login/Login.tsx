import { Button, FormControl, FormLabel, Paper, TextField } from '@mui/material'
import {
  styledForm,
  styledFormWrapper,
  styledInput,
  styledLabel,
  styledSubmitButton
} from './Login.styles.ts'

const Login = () => {
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

export default Login
