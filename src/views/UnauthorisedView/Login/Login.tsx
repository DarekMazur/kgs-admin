import { Button, FormControl, FormLabel, Paper, TextField } from '@mui/material'
import {
  styledForm,
  styledFormWrapper,
  styledInput,
  styledLabel,
  styledSubmitButton
} from './Login.styles.ts'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ILogin } from '../../../utils/types.ts'
import { useMe } from '../../../utils/hooks/useMe.tsx'
import { useNavigate } from 'react-router'

const initUser: ILogin = {
  email: null,
  password: null
}

const Login = () => {
  const [loggedUser, setLoggedUser] = useState(initUser)
  const me = useMe()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/')
    }
  }, [])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: 'email' | 'password'
  ) => {
    if (type === 'email') {
      setLoggedUser({ email: e.target.value, password: loggedUser.password })
    } else {
      setLoggedUser({ email: loggedUser.email, password: e.target.value })
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
      method: 'POST',
      body: JSON.stringify(loggedUser)
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(`Nie udało się zalogować`)
        }

        return res.json()
      })
      .then((res) => {
        localStorage.setItem('jwt', res.token)

        me(res.data.id)

        navigate('/home')
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  return (
    <Paper elevation={3} sx={styledFormWrapper}>
      <FormLabel sx={styledLabel}>Zaloguj się</FormLabel>
      <FormControl sx={styledForm}>
        <TextField
          label={'Email'}
          variant="filled"
          required
          type="email"
          sx={styledInput}
          onChange={(e) => handleInputChange(e, 'email')}
        />
        <TextField
          label={'Hasło'}
          variant="filled"
          required
          type="password"
          sx={styledInput}
          onChange={(e) => handleInputChange(e, 'password')}
        />
        <Button
          disabled={false}
          variant="contained"
          type="submit"
          sx={styledSubmitButton}
          onClick={handleSubmit}
        >
          Zaloguj
        </Button>
      </FormControl>
    </Paper>
  )
}

export default Login
