import { PieChart } from '@mui/x-charts/PieChart'
import { useGetUsersQuery } from '../../../store'
import { useEffect, useState } from 'react'
import { IUser } from '../../utils/types.ts'
import { Typography } from '@mui/material'

const HomeUsers = () => {
  const { data: users, isLoading } = useGetUsersQuery()
  const [newUsers, setNewUsers] = useState<IUser[]>([])
  const [suspended, setSuspended] = useState<IUser[]>([])
  const [banned, setBanned] = useState<IUser[]>([])

  useEffect(() => {
    const date7daysFromNow = new Date().getTime() - 7 * 24 * 60 * 60 * 1000

    if (users) {
      setNewUsers(users.filter((user) => user.registrationDate > new Date(date7daysFromNow)))
      setBanned(users.filter((user) => user.isBanned))
      setSuspended(
        users.filter((user) =>
          user.suspensionTimeout ? new Date(user.suspensionTimeout).getTime() > Date.now() : false
        )
      )
    }
  }, [users])

  return (
    <>
      {isLoading ? null : (
        <>
          {users ? (
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
              <Typography color="secondary">
                Wszyscy Użytkownicy:{' '}
                <Typography component="span" sx={{ fontWeight: 700 }}>
                  {users.length}
                </Typography>
              </Typography>
            </>
          ) : null}
        </>
      )}
    </>
  )
}

export default HomeUsers
