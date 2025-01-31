import { useParams } from 'react-router'
import {
  RootState,
  useGetRolesQuery,
  useGetSingleUsersQuery,
  useUpdateUsersMutation
} from '../../../../store'
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
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Paper
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
import { useEffect, useState } from 'react'
import { styledSubmitButton } from '../../UnauthorisedView/Login/Login.styles.ts'

interface IUserStatus {
  role?: string
  banned?: boolean
  suspended?: boolean
}

const UserView = () => {
  const { id } = useParams()
  const { data: user, isLoading } = useGetSingleUsersQuery(id as string)
  const { data: roles, isLoading: rolesLoading } = useGetRolesQuery()
  const [updateUser] = useUpdateUsersMutation()
  const globalUser: IUser | null = useSelector<RootState, IUser | null>((store) => store.globalUser)

  const suspensionTimes = [1, 7, 30]

  const initUserStatus = {
    role: user?.role.id.toString(),
    banned: user?.isBanned,
    suspended: user?.suspensionTimeout && user?.suspensionTimeout > new Date()
  }

  const [userStatus, setUserStatus] = useState<IUserStatus>()

  const [timeout, setTimeout] = useState('7')

  useEffect(() => {
    setUserStatus(initUserStatus)
  }, [user])

  const handleBannedStatus = () => {
    setUserStatus({ ...userStatus, banned: !userStatus?.banned })
  }

  const handleSuspendStatus = () => {
    setUserStatus({ ...userStatus, suspended: !userStatus?.suspended })
  }

  const handleRoleChange = (event: SelectChangeEvent) => {
    setUserStatus({ ...userStatus, role: event.target.value as string })
  }

  const handleTimeoutChange = (event: SelectChangeEvent) => {
    setTimeout(event.target.value as string)
  }

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

  const handleSubmit = (id: string) => {
    if (user) {
      updateUser({
        id,
        isBanned: userStatus?.banned || user.isBanned,
        suspensionTimeout: userStatus?.suspended
          ? new Date(Date.now() + Number(timeout) * 24 * 60 * 60 * 1000)
          : user.suspensionTimeout,
        role: userStatus?.role
          ? roles!.filter((role) => role.id === Number(userStatus.role))[0]
          : user.role
      })
    }
  }

  return (
    <Container>
      {isLoading || rolesLoading ? <Loader /> : null}
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
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '2rem',
                my: 4,
                p: 2
              }}
            >
              <UserEditControls
                user={{
                  ...user,
                  isBanned: userStatus?.banned || user.isBanned,
                  suspensionTimeout: userStatus?.suspended
                    ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    : user.suspensionTimeout,
                  role: userStatus?.role
                    ? roles!.filter((role) => role.id === Number(userStatus.role))[0]
                    : user.role
                }}
                handleSuspend={handleSuspendStatus}
                handleBan={handleBannedStatus}
              />
              <FormControl fullWidth>
                <InputLabel id="suspension-select-label">Czas zawieszenia</InputLabel>
                <Select
                  labelId="suspension-selectt"
                  id="suspension-select"
                  value={timeout}
                  label="Czas zawieszenia"
                  onChange={handleTimeoutChange}
                  sx={{ maxWidth: '20rem' }}
                  disabled={!userStatus?.suspended}
                >
                  {suspensionTimes.map((time) => (
                    <MenuItem key={time} value={time}>
                      {`${time.toString()} ${time === 1 ? 'dzień' : 'dni'}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {roles ? (
                <FormControl fullWidth>
                  <InputLabel id="role-select-label">Ustaw rolę</InputLabel>
                  <Select
                    labelId="role-select"
                    id="role-select"
                    value={userStatus?.role}
                    label="Ustaw rolę"
                    onChange={handleRoleChange}
                    disabled={!getAuth(user.role.id, globalUser.role.id)}
                    sx={{ maxWidth: '20rem' }}
                  >
                    {roles
                      .slice()
                      .sort((a, b) => b.id - a.id)
                      .map((role) => (
                        <MenuItem
                          key={role.id}
                          value={role.id}
                          disabled={globalUser.role.id >= role.id}
                        >
                          {role.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              ) : null}
              <Button
                variant="contained"
                sx={styledSubmitButton}
                onClick={() => handleSubmit(user.id)}
              >
                Zapisz
              </Button>
            </Paper>
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
