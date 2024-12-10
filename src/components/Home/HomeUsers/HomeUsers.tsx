import { PieChart } from '@mui/x-charts/PieChart'
import { useGetUsersQuery } from '../../../../store'
import { FC, useEffect, useState } from 'react'
import { IUser } from '../../../utils/types.ts'
import { Box, Divider, Grid2 as Grid, Link, Tooltip, Typography } from '@mui/material'
import { formatDate } from '../../../utils/helpers/formatDate.ts'
import GroupIcon from '@mui/icons-material/Group'
import BlockIcon from '@mui/icons-material/Block'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import BedroomBabyIcon from '@mui/icons-material/BedroomBaby'
import KeyOffIcon from '@mui/icons-material/KeyOff'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import Loader from '../../Loader/Loader.tsx'
import { Link as RouterLink } from 'react-router'

const HomeUsers = () => {
  const { data: users, isLoading } = useGetUsersQuery()
  const [newUsers, setNewUsers] = useState<IUser[]>([])
  const [suspended, setSuspended] = useState<IUser[]>([])
  const [banned, setBanned] = useState<IUser[]>([])

  useEffect(() => {
    const date7daysFromNow = Date.now() - 7 * 24 * 60 * 60 * 1000

    if (users) {
      setNewUsers(
        users.filter((user) => new Date(user.registrationDate).getTime() > date7daysFromNow)
      )
      setBanned(users.filter((user) => user.isBanned))
      setSuspended(
        users.filter(
          (user) =>
            user.suspensionTimeout && new Date(user.suspensionTimeout).getTime() > Date.now()
        )
      )
    }
  }, [users])

  const buttons = [
    {
      icon: <GroupIcon sx={{ fontSize: '10vw' }} />,
      label: 'Zobacz wszystkich Użytkowników',
      link: '/admin/users'
    },
    {
      icon: <BedroomBabyIcon sx={{ fontSize: '10vw' }} />,
      label: 'Zobacz najnowszych Użytkowników',
      link: `/admin/users/${users && users[0].id}`
    },
    {
      icon: <KeyOffIcon sx={{ fontSize: '10vw' }} />,
      label: 'Zobacz nieaktywnych Użytkowników',
      link: '/'
    },
    {
      icon: <HourglassBottomIcon sx={{ fontSize: '10vw' }} />,
      label: 'Zobacz zawieszonych Użytkowników',
      link: '/'
    },
    {
      icon: <BlockIcon sx={{ fontSize: '10vw' }} />,
      label: 'Zobacz zablokowanych Użytkowników',
      link: '/'
    },
    {
      icon: <AccountBalanceIcon sx={{ fontSize: '10vw' }} />,
      label: 'Zobacz administrację',
      link: '/'
    }
  ]

  const UsersChart: FC<{ users: IUser[] }> = ({ users }) => {
    return (
      <>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: newUsers.length, label: 'Nowi Użytkownicy' },
                { id: 1, value: suspended.length, label: 'Zawieszeni Użytkownicy' },
                { id: 2, value: banned.length, label: 'Zablokowani Użytkownicy' },
                {
                  id: 3,
                  value: users.length - banned.length - newUsers.length - suspended.length,
                  label: 'Pozostali'
                }
              ]
            }
          ]}
          width={800}
          height={300}
        />
        <Typography color="text.primary">
          Wszyscy Użytkownicy:{' '}
          <Typography component="span" color="secondary" sx={{ fontWeight: 700 }}>
            {users.length}
          </Typography>
        </Typography>
        <Typography>
          Najnowszy Użytkownik:{' '}
          <Typography component="span" color="secondary" sx={{ fontWeight: 700 }}>
            {users[0].username} ({formatDate(new Date(users[0].registrationDate))})
          </Typography>
        </Typography>
        <Typography>
          Nieaktywnych Użytkowników:{' '}
          <Typography component="span" color="secondary" sx={{ fontWeight: 700 }}>
            {users.filter((user) => !user.isConfirmed).length}
          </Typography>
        </Typography>
        <Divider sx={{ my: '2rem' }} />
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid container columns={3}>
            {buttons.map((button) => (
              <Grid key={button.label} size={1}>
                <Tooltip title={button.label}>
                  <Link component={RouterLink} to={button.link}>
                    {button.icon}
                  </Link>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Box>
      </>
    )
  }

  return <>{isLoading ? <Loader /> : <>{users ? <UsersChart users={users} /> : null}</>}</>
}

export default HomeUsers
