import { Box, Container, Link, Typography } from '@mui/material'
import { useGetPostsQuery } from '../../../../store'
import { useEffect, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { formatDate } from '../../../utils/helpers/formatDate.ts'
import Loader from '../../../components/Loader/Loader.tsx'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'

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

interface IPostsRows {
  id: string
  publicId: number
  peak: string
  author: string
  isHidden: boolean
  publishedAt: Date
}

const Posts = () => {
  const { data: posts, isLoading } = useGetPostsQuery()
  const [rows, setRows] = useState<IPostsRows[]>([])

  const Author = ({ id }: { id: string }) => {
    if (posts) {
      const post = posts.filter((post) => post.author.id === id)[0]

      if (post) {
        return <Link href={`/admin/users/${post.author.id}`}>{post.author.username}</Link>
      }

      return <></>
    }
  }

  const columns: GridColDef[] = [
    { field: 'publicId', headerName: 'id', width: 50, sortable: false },
    {
      field: 'author',
      headerName: 'Autor',
      width: 140,
      renderCell: (params) => <Author id={params.value as string} />
    },
    { field: 'peak', headerName: 'Szczyt', width: 200 },
    { field: 'notes', headerName: 'Notatki', width: 350 },
    {
      field: 'isHidden',
      headerName: 'Widoczny?',
      width: 50,
      renderCell: (params) => (params.value ? <CloseIcon /> : <DoneIcon />)
    },
    {
      field: 'publishedAt',
      headerName: 'Data publikacji:',
      width: 170,
      valueGetter: (_value, row) => `${formatDate(new Date(row.publishedAt))}`
    },
    {
      field: 'id',
      headerName: '',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <Link href={`/admin/posts/${params.value}`} underline="none" sx={linkButton}>
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
    if (posts) {
      setRows([])
      posts.map((post, index) => {
        const row = {
          id: post.id,
          publicId: index + 1,
          peak: post.peak.name,
          notes: post.notes,
          author: post.author.id,
          isHidden: post.isHidden,
          publishedAt: post.createdAt
        }

        setRows((prevState) => [...prevState, row])
      })
    }
  }, [posts])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container component="main" sx={{ p: '3rem', my: '2rem' }}>
          <Typography variant="h3" color="secondary">
            Wpisy
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
            {posts && posts.length > 0 ? (
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
                    labelRowsPerPage: 'Postów na stronę'
                  }
                }}
              />
            ) : (
              <Typography>Brak wpisów</Typography>
            )}
          </Box>
        </Container>
      )}
    </>
  )
}

export default Posts
