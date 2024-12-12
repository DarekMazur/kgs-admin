import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  FormControl,
  Input,
  TextField,
  Typography
} from '@mui/material'
import { IUser } from '../../../utils/types.ts'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, setGlobalUser, useUpdateUsersMutation } from '../../../../store'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { theme } from '../../../utils/theme.tsx'
import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import {
  styledInput,
  styledResetButton,
  styledSubmitButton
} from '../../UnauthorisedView/Login/Login.styles.ts'

const Edit = () => {
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((state) => state.globalUser)
  const [image, setImage] = useState<File[]>([])
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const [updateUser] = useUpdateUsersMutation()
  const dispatch = useDispatch()

  const initialData = {
    avatar: globalUser ? globalUser.avatar : '',
    firstName: globalUser ? globalUser.firstName : '',
    lastName: globalUser ? globalUser.lastName : '',
    description: globalUser ? globalUser.description : ''
  }

  const [edited, setEdited] = useState(initialData)

  useEffect(() => {
    if (globalUser) {
      setEdited({
        avatar: globalUser.avatar,
        firstName: globalUser.firstName,
        lastName: globalUser.lastName,
        description: globalUser.description
      })
    }
  }, [globalUser])

  useEffect(() => {
    if (imageUrl) {
      setEdited({ ...edited, avatar: imageUrl })
    }
  }, [imageUrl])

  useEffect(() => {
    image.length > 0 && setImageUrl(URL.createObjectURL(image[0]))
  }, [image])

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]

      if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
        alert('Zły format pliku. Zdjęcie musi mieć format png lub jpg!')
        return
      }

      if (file.size > 1024 * 1024) {
        alert('Za duże zdjęcie. Maksymalny rozmiar pliku to 1MB!')
        return
      }

      setImage([file])
    }
  }

  const handleReset = (e: FormEvent) => {
    e.preventDefault()

    setEdited(initialData)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    dispatch(setGlobalUser({ ...globalUser, ...edited }))
    updateUser({ id: globalUser!.id, ...edited })
  }

  return (
    <>
      {globalUser ? (
        <Container component="main">
          <FormControl sx={{ width: '100%', my: '2rem' }}>
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
                  src={edited.avatar}
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
                    value={''}
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
            <Box
              sx={{
                p: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center'
              }}
            >
              <TextField
                label={'Imię'}
                variant="filled"
                type="text"
                sx={styledInput}
                value={edited.firstName}
                onChange={(e) => {
                  setEdited({ ...edited, firstName: e.target.value })
                }}
              />
              <TextField
                label={'Nazwisko'}
                variant="filled"
                type="text"
                sx={styledInput}
                value={edited.lastName}
                onChange={(e) => {
                  setEdited({ ...edited, lastName: e.target.value })
                }}
              />
              <TextField
                label={'O mnie'}
                variant="filled"
                multiline
                rows={4}
                type="text"
                sx={styledInput}
                value={edited.description}
                onChange={(e) => {
                  setEdited({ ...edited, description: e.target.value })
                }}
              />
            </Box>
            <ButtonGroup size="large" sx={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
              <Button
                disabled={
                  edited.avatar === globalUser.avatar &&
                  edited.description === globalUser.description &&
                  edited.firstName === globalUser.firstName &&
                  edited.lastName === globalUser.lastName
                }
                variant="contained"
                type="reset"
                sx={styledResetButton}
                onClick={handleReset}
              >
                Anuluj
              </Button>
              <Button
                disabled={
                  edited.avatar === globalUser.avatar &&
                  edited.description === globalUser.description &&
                  edited.firstName === globalUser.firstName &&
                  edited.lastName === globalUser.lastName
                }
                variant="contained"
                type="submit"
                sx={styledSubmitButton}
                onClick={handleSubmit}
              >
                Zapisz
              </Button>
            </ButtonGroup>
          </FormControl>
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
