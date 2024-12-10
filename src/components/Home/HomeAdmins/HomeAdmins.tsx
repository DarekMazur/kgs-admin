import { PieChart } from '@mui/x-charts/PieChart'
import { useGetUsersQuery } from '../../../../store'
import { FC, useEffect, useState } from 'react'
import { IUser } from '../../../utils/types.ts'
import { Box, Divider, Grid2 as Grid, Link, Tooltip, Typography } from '@mui/material'
import GroupIcon from '@mui/icons-material/Group'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload'
import Loader from '../../Loader/Loader.tsx'

const HomeAdmins = () => {
  const { data: users, isLoading } = useGetUsersQuery()
  const [moderators, setModerators] = useState<IUser[]>([])
  const [admins, setAdmins] = useState<IUser[]>([])
  const [superAdmins, setSuperAdmins] = useState<IUser[]>([])

  useEffect(() => {
    if (users) {
      setModerators(users.filter((user) => user.role.id === 3))
      setAdmins(users.filter((user) => user.role.id === 2))
      setSuperAdmins(users.filter((user) => user.role.id === 1))
    }
  }, [users])

  const buttons = [
    {
      icon: <GroupIcon sx={{ fontSize: '10vw' }} />,
      label: 'Zobacz cały zespół',
      link: '/'
    },
    {
      icon: <ManageAccountsIcon sx={{ fontSize: '10vw' }} />,
      label: 'Zobacz wszystkich moderatorów',
      link: '/'
    },
    {
      icon: <AccountBalanceIcon sx={{ fontSize: '10vw' }} />,
      label: 'Zobacz wszystkich administratorów',
      link: '/'
    },
    {
      icon: <AssuredWorkloadIcon sx={{ fontSize: '10vw' }} />,
      label: 'Zobacz wszystkich super administratorów',
      link: '/'
    }
  ]

  const AdminsChart: FC<{ users: IUser[] }> = ({ users }) => {
    return (
      <>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: moderators.length, label: 'Moderatorzy' },
                { id: 1, value: admins.length, label: 'Administratorzy' },
                { id: 2, value: superAdmins.length, label: 'Super Administratorzy' }
              ]
            }
          ]}
          width={800}
          height={300}
        />
        <Typography color="text.primary">
          Wielkość zespołu:{' '}
          <Typography component="span" color="secondary" sx={{ fontWeight: 700 }}>
            {users.filter((user) => user.role.id < 4).length}
          </Typography>
        </Typography>
        <Divider sx={{ my: '2rem' }} />
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid container columns={5} gap={5}>
            {buttons.map((button) => (
              <Grid key={button.label} size={1}>
                <Tooltip title={button.label}>
                  <Link href={button.link}>{button.icon}</Link>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </Box>
      </>
    )
  }

  return <>{isLoading ? <Loader /> : <>{users ? <AdminsChart users={users} /> : null}</>}</>
}

export default HomeAdmins
