import { Avatar, Box, Button, Container, Divider, Input, Typography } from '@mui/material'
import { IUser } from '../../../utils/types.ts'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { theme } from '../../../utils/theme.tsx'
import { ChangeEvent } from 'react'

const Edit = () => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((state) => state.globalUser)

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      console.log(file)

      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        alert('Zły format pliku. Zdjęcie musi mieć format png lub jpg!')
        return
      }

      if (file.size > 1024 * 1024) {
        alert('Za duże zdjęcie. Maksymalny rozmiar pliku to 1MB!')
        return
      }
    }
  }
  return (
    <>
      {globalUser ? (
        <Container component="main">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              mb: '2rem',
              gap: '3rem'
            }}
          >
            <Box sx={{ position: 'relative', width: 200, height: 200 }}>
              <Avatar
                alt={globalUser.username as string}
                src={globalUser.avatar}
                sx={{ width: 200, height: 200 }}
              />
              <Button
                component="label"
                tabIndex={-1}
                startIcon={
                  <CloudUploadIcon
                    sx={{
                      width: '50px',
                      height: '50px'
                    }}
                  />
                }
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  p: '5px',
                  position: 'absolute',
                  top: '50%',
                  right: '50%',
                  transform: 'translate(50%, -50%)',
                  backgroundColor: `${theme.palette.background.default}4d`,
                  '&:hover': {
                    backgroundColor: theme.palette.background.default
                  },
                  '& .MuiButton-startIcon': {
                    m: 0
                  }
                }}
              >
                <Input
                  type="file"
                  onChange={handleFileUpload}
                  inputProps={{
                    accept: 'image/png, image/jpeg'
                  }}
                  sx={{
                    clip: 'rect(0 0 0 0)',
                    clipPath: 'inset(50%)',
                    height: 1,
                    overflow: 'hidden',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    whiteSpace: 'nowrap',
                    width: 1
                  }}
                />
              </Button>
            </Box>
            <Typography variant="h4" component="h3">
              {globalUser.username}
            </Typography>
          </Box>
          <Divider />
        </Container>
      ) : (
        <Typography variant="h3" color="error">
          Nie można załadować danych...
        </Typography>
      )}
    </>
  )
}

export default Edit
