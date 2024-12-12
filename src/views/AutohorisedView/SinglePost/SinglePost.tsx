import {
  Container,
  Typography,
  Box,
  Divider,
  Link,
  Switch,
  FormGroup,
  FormControlLabel
} from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router'
import { useGetSinglePostQuery } from '../../../../store'
import Loader from '../../../components/Loader/Loader.tsx'
import { formatDate } from '../../../utils/helpers/formatDate.ts'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import BreadcrumbsNav from '../../../components/BreadcrumbsNav/BreadcrumbsNav.tsx'
import VisibilityIcon from '@mui/icons-material/Visibility'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import BlockIcon from '@mui/icons-material/Block'

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
              <Box sx={{ my: '2rem' }}>
                <BreadcrumbsNav name={post.peak.name as string} />
                <Typography variant="h3">
                  <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {post.isHidden ? <VisibilityOffIcon color="error" fontSize="large" /> : null}
                    <Typography variant="h3" component={'span'} color="secondary">
                      {post.peak.name}
                    </Typography>
                    dodany przez{' '}
                    <Link component={RouterLink} to={`/admin/users/${post.author.id}`}>
                      {post.author.username}
                    </Link>
                  </Box>
                </Typography>
              </Box>
              <Typography>{formatDate(new Date(post.createdAt))}</Typography>
              <FormGroup>
                <Box
                  component="span"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    mt: '2rem',
                    mb: '1rem'
                  }}
                >
                  <VisibilityIcon color={post.isHidden ? 'info' : 'disabled'} />
                  <FormControlLabel
                    control={<Switch checked={post.isHidden} />}
                    label="Widoczność wpisu"
                  />
                </Box>
                <Box
                  component="span"
                  sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', my: '1rem' }}
                >
                  <WarningAmberIcon color={post.author.isSuspended ? 'warning' : 'disabled'} />
                  <FormControlLabel
                    control={<Switch checked={post.author.isSuspended} />}
                    label="Autor - zaieszenie"
                  />
                </Box>
                <Box
                  component="span"
                  sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', my: '1rem' }}
                >
                  <BlockIcon color={post.author.isBanned ? 'error' : 'disabled'} />
                  <FormControlLabel
                    control={<Switch checked={post.author.isBanned} />}
                    label="Autor - blokada"
                  />
                </Box>
              </FormGroup>
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
