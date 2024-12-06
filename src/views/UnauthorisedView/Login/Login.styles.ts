import { theme } from '../../../utils/theme.tsx'

export const styledFormWrapper = {
  p: '2rem 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}

export const styledLabel = {
  fontFamily: '"Russo One", sans-serif;',
  fontSize: '2rem',
  fontWeight: 700
}

export const styledForm = {
  m: '3rem 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '700px'
}

export const styledInput = {
  border: 'none',
  fontSize: '1.5rem',
  mb: '3rem',
  width: '100%',
  maxWidth: '400px'
}

export const styledSubmitButton = {
  fontFamily: '"Russo One", sans-serif;',
  width: '10rem',
  height: '3rem',
  m: '1rem 1.2rem',
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.primary.contrastText,
  alignSelf: 'self-end'
}
