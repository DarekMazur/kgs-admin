import { Container, Typography, Box, Divider } from '@mui/material'
import { useGetSinglePostQuery } from '../../../../store'
import { useParams } from 'react-router'
import Loader from '../../../components/Loader/Loader.tsx'
import { formatDate } from '../../../utils/helpers/formatDate.ts'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const SinglePost = () => {
  const { id } = useParams()
  const { data: post, isLoading } = useGetSinglePostQuery(id as string)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container component="main">
          {post ? (
            <>
              <Typography variant="h3" sx={{ my: '2rem' }}>
                <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {post.isHidden ? <VisibilityOffIcon color="error" fontSize="large" /> : null}
                  <Typography variant="h3" component={'span'} color="secondary">
                    {post.peak.name}
                  </Typography>{' '}
                  dodany przez {post.author.username}
                </Box>
              </Typography>
              <Typography>{formatDate(new Date(post.createdAt))}</Typography>
              <Box sx={{ display: 'flex', gap: '2rem', alignItems: 'center', m: '2rem' }}>
                <Box
                  component="img"
                  src={post.photo}
                  alt={`${post.peak.name} by ${post.author.username}`}
                  loading="lazy"
                  sx={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                />
                <Divider orientation="vertical" variant="middle" flexItem />
                <Typography>{post.notes}</Typography>
              </Box>
            </>
          ) : null}
        </Container>
      )}
    </>
  )
}

export default SinglePost
