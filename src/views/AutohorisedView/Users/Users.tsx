import { Avatar, Box, Checkbox, Container, Link, Typography } from '@mui/material'
import { useGetUsersQuery } from '../../../../store'
import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Loader from '../../../components/Loader/Loader.tsx'
import { formatDate } from '../../../utils/helpers/formatDate.ts'

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

const linkButton = {
  width: '100%',
  height: '2rem',
  p: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 2,
  backgroundColor: 'secondary.main',
  color: 'primary.contrastText',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: 'secondary.light'
  }
}

const Users = () => {
  const { data: users, isLoading } = useGetUsersQuery()
  const [rows, setRows] = useState<IUsersRows[]>([])

  const columns: GridColDef[] = [
    { field: 'publicId', headerName: 'id', width: 70, sortable: false },
    {
      field: 'avatar',
      headerName: '',
      width: 80,
      sortable: false,
      renderCell: (params) => <Avatar alt="" src={params.value} />,
      cellClassName: () => {
        return 'center'
      }
    },
    { field: 'username', headerName: 'Użytkownik', width: 200 },
    { field: 'firstName', headerName: 'Imię', width: 100 },
    { field: 'lastName', headerName: 'Nazwisko', width: 100 },
    { field: 'email', headerName: 'Email', width: 180 },
    {
      field: 'isConfirmed',
      headerName: 'Aktywny?',
      width: 50,
      renderCell: (params) => <Checkbox checked={params.value} />
    },
    {
      field: 'isSuspended',
      headerName: 'Zawieszony?',
      width: 50,
      renderCell: (params) => <Checkbox checked={params.value} />
    },
    {
      field: 'suspensionTimeout',
      headerName: 'Zawieszony do:',
      width: 80,
      valueGetter: (_value, row) =>
        `${row.suspensionTimeout === undefined || new Date(row.suspensionTimeout).getTime() < Date.now() ? '' : formatDate(new Date(row.suspensionTimeout))}`
    },
    { field: 'totalSuspensions', headerName: 'Łącznie zawieszeń', width: 80 },
    {
      field: 'isBanned',
      headerName: 'Zablokowany?',
      width: 80,
      renderCell: (params) => <Checkbox checked={params.value} />
    },
    {
      field: 'registrationDate',
      headerName: 'Dołączył:',
      width: 120,
      valueGetter: (_value, row) => `${formatDate(new Date(row.registrationDate))}`
    },
    {
      field: 'role',
      headerName: 'Rola',
      width: 140
    },
    {
      field: 'id',
      headerName: '',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Link href={`/admin/users/${params.value}`} underline="none" sx={linkButton}>
          Edytuj
        </Link>
      ),
      cellClassName: () => {
        return 'center'
      }
    }
  ]

  const paginationModel = { page: 0, pageSize: 5 }

  useEffect(() => {
    if (users && users.length !== rows.length) {
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
            <Container component="main" maxWidth="xl" sx={{ p: '3rem', my: '2rem' }}>
              <Typography variant="h3" color="secondary">
                Użytkownicy
              </Typography>
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
                  pageSizeOptions={[5, 10, 50, 100]}
                  checkboxSelection
                  sx={{ border: 0 }}
                  slotProps={{
                    pagination: {
                      labelRowsPerPage: 'Użytkowników na stronę'
                    }
                  }}
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
