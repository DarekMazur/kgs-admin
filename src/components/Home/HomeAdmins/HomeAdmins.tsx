import { PieChart } from '@mui/x-charts/PieChart'
import { useGetUsersQuery } from '../../../../store'
import { useEffect, useState } from 'react'
import { IUser } from '../../../utils/types.ts'

const HomeAdmins = () => {
  const { data: users, isLoading } = useGetUsersQuery()
  const [moderators, setModerators] = useState<IUser[]>([])
  const [admins, setAdmins] = useState<IUser[]>([])
  const [superAdmins, setSuperAdmins] = useState<IUser[]>([])

  useEffect(() => {
    if (users) {
      setModerators(users.filter((user) => user.role.id === 2))
      setAdmins(users.filter((user) => user.role.id === 1))
      setSuperAdmins(users.filter((user) => user.role.id === 0))
    }
  }, [users])

  return (
    <>
      {isLoading ? null : (
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
        </>
      )}
    </>
  )
}

export default HomeAdmins
