import {
  Container,
  Typography,
  Box,
  Divider,
  Link,
  Switch,
  FormGroup,
  FormControlLabel,
  Tooltip,
  Button
} from '@mui/material'
import { Link as RouterLink, useParams } from 'react-router'
import { useGetSinglePostQuery, useUpdatePostMutation } from '../../../../store'
import Loader from '../../../components/Loader/Loader.tsx'
import { formatDate } from '../../../utils/helpers/formatDate.ts'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import BreadcrumbsNav from '../../../components/BreadcrumbsNav/BreadcrumbsNav.tsx'
import VisibilityIcon from '@mui/icons-material/Visibility'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import BlockIcon from '@mui/icons-material/Block'
import { FormEvent, useState } from 'react'

const SinglePost = () => {
  const { id } = useParams()
  const { data: post, isLoading } = useGetSinglePostQuery(id as string)
  const [status, setStatus] = useState<{
    visibility: boolean
    authorSuspended: boolean
    authorBanned: boolean
  }>({
    visibility: post ? post.isHidden : false,
    authorSuspended: post ? post.author.isSuspended : false,
    authorBanned: post ? post.author.isBanned : false
  })
  const [updatePost] = useUpdatePostMutation()

  const handleSubmit = (e: FormEvent) => {
    if (post) {
      e.preventDefault()

      updatePost({
        id: post.id,
        isHidden: status.visibility,
        author: {
          id: post.author.id,
          isSuspended: status.authorSuspended,
          isBanned: status.authorBanned
        }
      })
    }
  }

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
                  <VisibilityIcon color={status.visibility ? 'info' : 'disabled'} />
                  <FormControlLabel
                    control={
                      <Tooltip title={status.visibility ? 'Pokaż' : 'Ukryj'}>
                        <Switch
                          checked={status.visibility}
                          onChange={() => setStatus({ ...status, visibility: !status.visibility })}
                        />
                      </Tooltip>
                    }
                    label="Widoczność wpisu"
                  />
                </Box>
                <Box
                  component="span"
                  sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', my: '1rem' }}
                >
                  <WarningAmberIcon color={status.authorSuspended ? 'warning' : 'disabled'} />
                  <FormControlLabel
                    control={
                      <Tooltip title={status.authorSuspended ? 'Cofnij zawiszenie' : 'Zawieś'}>
                        <Switch
                          checked={status.authorSuspended}
                          onChange={() =>
                            setStatus({
                              ...status,
                              authorSuspended: !status.authorSuspended,
                              authorBanned: false
                            })
                          }
                        />
                      </Tooltip>
                    }
                    label="Autor - zawieszenie"
                  />
                </Box>
                <Box
                  component="span"
                  sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', my: '1rem' }}
                >
                  <BlockIcon color={status.authorBanned ? 'error' : 'disabled'} />
                  <FormControlLabel
                    control={
                      <Tooltip title={status.authorBanned ? 'Odblokuj' : 'Zablokuj'}>
                        <Switch
                          checked={status.authorBanned}
                          onChange={() =>
                            setStatus({
                              ...status,
                              authorSuspended: false,
                              authorBanned: !status.authorBanned
                            })
                          }
                        />
                      </Tooltip>
                    }
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
              <Button onClick={handleSubmit}>Submit</Button>
            </>
          ) : null}
        </Container>
      )}
    </>
  )
}

export default SinglePost
