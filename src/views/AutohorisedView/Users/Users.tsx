import { Avatar, Box, Container, Link, Typography } from '@mui/material'
import { useGetUsersQuery } from '../../../../store'
import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Loader from '../../../components/Loader/Loader.tsx'

interface IUsersRows {
  id: string
  publicId: number
  username: string
  firstName?: string
  lastName?: string
  email: string
  avatar: string
  isConfirmed: boolean
  isSuspended: boolean
  suspensionTimeout?: Date
  totalSuspensions: number
  isBanned: boolean
  registrationDate: Date
  role: 'Użytkownik' | 'Moderator' | 'Administrator' | 'Super Administrator'
}

const Users = () => {
  const { data: users, isLoading } = useGetUsersQuery()
  const [rows, setRows] = useState<IUsersRows[]>([])

  const columns: GridColDef[] = [
    { field: 'publicId', headerName: ' ', width: 70 },
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 80,
      sortable: false,
      renderCell: (params) => <Avatar alt="" src={params.value} />,
      cellClassName: () => {
        return 'center'
      }
    },
    { field: 'username', headerName: 'username', width: 130 },
    { field: 'firstName', headerName: 'First name', width: 100 },
    { field: 'lastName', headerName: 'Last name', width: 100 },
    { field: 'email', headerName: 'Email', width: 100 },
    { field: 'isConfirmed', headerName: 'Confirmed?', width: 50 },
    { field: 'isSuspended', headerName: 'Suspended?', width: 50 },
    { field: 'suspensionTimeout', headerName: 'Suspended end', width: 80 },
    { field: 'totalSuspensions', headerName: 'Total Suspensions', width: 80 },
    { field: 'registrationDate', headerName: 'Registration at', width: 100 },
    { field: 'role', headerName: 'Role', width: 70 },
    {
      field: 'id',
      headerName: 'Przejdź',
      width: 80,
      sortable: false,
      renderCell: (params) => <Link href={`/admin/users/${params.value}`}>Przejdź</Link>
    }
  ]

  const paginationModel = { page: 0, pageSize: 5 }

  useEffect(() => {
    if (users) {
      users.map((user, index) => {
        const row = {
          id: user.id,
          publicId: index + 1,
          username: user.username as string,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email as string,
          avatar: user.avatar,
          isConfirmed: user.isConfirmed,
          isSuspended:
            user.suspensionTimeout === undefined
              ? false
              : new Date(user.suspensionTimeout).getTime() > Date.now(),
          suspensionTimeout: user.suspensionTimeout,
          totalSuspensions: user.totalSuspensions,
          isBanned: user.isBanned,
          registrationDate: user.registrationDate,
          role: user.role.name as
            | 'Użytkownik'
            | 'Moderator'
            | 'Administrator'
            | 'Super Administrator'
        }

        setRows((prevState) => [...prevState, row])
      })
    }
  }, [users])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {users ? (
            <Container component="main">
              <Typography>Users</Typography>
              <Box
                sx={{
                  '& .center': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }
                }}
              >
                <DataGrid
                  getRowId={(row) => row.id}
                  rows={rows}
                  columns={columns}
                  initialState={{ pagination: { paginationModel } }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                  sx={{ border: 0 }}
                />
              </Box>
            </Container>
          ) : null}
        </>
      )}
    </>
  )
}

export default Users
