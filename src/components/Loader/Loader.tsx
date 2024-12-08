import { CircularProgress, Paper } from '@mui/material'

const Loader = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress size={90} thickness={2} color="secondary" />
    </Paper>
  )
}

export default Loader
