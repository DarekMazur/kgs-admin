import { Avatar, Box, Container, Link, Typography } from '@mui/material'
import { useGetUsersQuery } from '../../../../store'
import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Loader from '../../../components/Loader/Loader.tsx'
import { formatDate } from '../../../utils/helpers/formatDate.ts'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import BreadcrumbsNav from '../../../components/BreadcrumbsNav/BreadcrumbsNav.tsx'
import { Link as RouterLink } from 'react-router'
import { IUserParams } from '../../../utils/types.ts'
import { useLocation } from 'react-router-dom'

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

const Users = (props: { params?: IUserParams }) => {
  const { data: users, isLoading } = useGetUsersQuery(props.params)
  const [rows, setRows] = useState<IUsersRows[]>([])
  const location = useLocation()

  const pageHeader = () => {
    const pathNames = location.pathname.split('/').filter((x) => x)

    const newVal = (value: string) => {
      switch (value) {
        case 'users':
          return 'użytkownicy'
        case 'team':
          return 'zespół'
        case 'mod':
          return 'moderatorzy'
        case 'admin':
          return 'administratorzy'
        case 'super-admin':
          return 'super administratorzy'
        case 'latest':
          return 'nowi użytkownicy'
        default:
          return value
      }
    }

    return newVal(pathNames[pathNames.length - 1])
  }

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
      renderCell: (params) => (params.value ? <DoneIcon /> : <CloseIcon />)
    },
    {
      field: 'isSuspended',
      headerName: 'Zawieszony?',
      width: 50,
      renderCell: (params) => (params.value ? <DoneIcon /> : <CloseIcon />)
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
      renderCell: (params) => (params.value ? <DoneIcon /> : <CloseIcon />)
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
        <Link
          component={RouterLink}
          to={`/admin/users/${params.value}`}
          underline="none"
          sx={linkButton}
        >
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
    if (users) {
      setRows([])
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
          <Container component="main" maxWidth="xl" sx={{ p: '3rem', pt: '1rem', mb: '2rem' }}>
            <BreadcrumbsNav />
            <Typography variant="h3" color="secondary" sx={{ textTransform: 'capitalize' }}>
              {pageHeader()}
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
              {users && users.length > 0 ? (
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
              ) : (
                <Typography>Brak Użytkowników</Typography>
              )}
            </Box>
          </Container>
        </>
      )}
    </>
  )
}

export default Users
