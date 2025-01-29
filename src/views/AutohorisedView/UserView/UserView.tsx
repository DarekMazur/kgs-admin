import { useParams } from 'react-router'
import { RootState, useGetSingleUsersQuery, useUpdateUsersMutation } from '../../../../store'
import {
  Avatar,
  Box,
  Divider,
  Container,
  Typography,
  List,
  ListItem,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Tooltip
} from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import BlockIcon from '@mui/icons-material/Block'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Loader from '../../../components/Loader/Loader.tsx'
import BreadcrumbsNav from '../../../components/BreadcrumbsNav/BreadcrumbsNav.tsx'
import { IUser } from '../../../utils/types'
import { useSelector } from 'react-redux'
import { getAuth } from '../../../utils/helpers/getAuth.ts'
import UserEditControls from '../../../components/UserEditControls/UserEditControls.tsx'

const UserView = () => {
  const { id } = useParams()
  const { data: user, isLoading } = useGetSingleUsersQuery(id as string)
  const [updateUser] = useUpdateUsersMutation()
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((store) => store.globalUser)

  const handleHide = (id: string) => {
    if (user) {
      const post = user.posts.filter((post) => post.id === id)[0]

      const updatedPost = {
        ...post,
        isHidden: !post.isHidden
      }
      updateUser({ id: user.id, post: updatedPost })
    }
  }

  const handleSuspend = (id: string) => {
    if (user) {
      updateUser({
        id,
        totalSuspensions: user.totalSuspensions + 1,
        suspensionTimeout: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      })
    }
  }

  const handleBan = (id: string) => {
    if (user) {
      updateUser({
        id,
        isBanned: !user.isBanned,
        suspensionTimeout: new Date()
      })
    }
  }

  return (
    <Container>
      {isLoading ? <Loader /> : null}
      {user && globalUser ? (
        <Box sx={{ mt: '2rem' }}>
          <BreadcrumbsNav name={user.username as string} />
          <Box sx={{ display: 'flex', alignItems: 'center', my: '2rem', gap: '3rem' }}>
            <Avatar
              alt={user.username as string}
              src={user.avatar}
              sx={{ width: 150, height: 150 }}
            />
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box>
              <Typography
                variant="h3"
                color="secondary"
                sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
              >
                {user.isBanned ? <BlockIcon color="error" fontSize="large" /> : null}
                {user.suspensionTimeout &&
                new Date(user.suspensionTimeout).getTime() > Date.now() ? (
                  <WarningAmberIcon color="warning" fontSize="large" />
                ) : null}{' '}
                {user.username}
              </Typography>
              <Typography variant="h4">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography>{user.email}</Typography>
              <Typography sx={{ mt: '1rem' }}>
                Rola:{' '}
                <Typography component="span" color="secondary">
                  {user.role.name}
                </Typography>
              </Typography>
            </Box>
          </Box>
          {getAuth(user.role.id, globalUser.role.id) ? (
            <Box>
              <UserEditControls user={user} handleSuspend={handleSuspend} handleBan={handleBan} />
            </Box>
          ) : null}

          {user.posts.length > 0 ? (
            <>
              <Typography>Wpisy Użytkownika:</Typography>
              <List sx={{ mb: '2rem' }}>
                {user.posts.map((post) => (
                  <ListItem
                    key={post.id}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      py: '1rem'
                    }}
                  >
                    <Card sx={{ width: 800 }}>
                      <CardMedia
                        component="img"
                        height="300"
                        image={post.photo}
                        alt={post.peak.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                        >
                          {post.isHidden ? (
                            <VisibilityOffIcon color="error" fontSize="large" />
                          ) : null}
                          {post.peak.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {post.notes}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        {post.isHidden ? (
                          <Tooltip title="Pokaż wpis">
                            <IconButton onClick={() => handleHide(post.id)}>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Ukryj wpis">
                            <IconButton onClick={() => handleHide(post.id)}>
                              <VisibilityOffIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                        <UserEditControls
                          user={user}
                          handleSuspend={handleSuspend}
                          handleBan={handleBan}
                        />
                      </CardActions>
                    </Card>
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <Typography>Brak wpisów</Typography>
          )}
        </Box>
      ) : null}
    </Container>
  )
}

export default UserView
