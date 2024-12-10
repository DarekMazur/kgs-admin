import { PieChart } from '@mui/x-charts/PieChart'
import { useGetPostsQuery } from '../../../../store'
import { FC, useEffect, useState } from 'react'
import { IPost } from '../../../utils/types.ts'
import { Box, Divider, Grid2 as Grid, Link, Tooltip, Typography } from '@mui/material'
import { formatDate } from '../../../utils/helpers/formatDate.ts'
import BedroomBabyIcon from '@mui/icons-material/BedroomBaby'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import BlockIcon from '@mui/icons-material/Block'
import ForumIcon from '@mui/icons-material/Forum'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Loader from '../../Loader/Loader.tsx'

const HomePosts = () => {
  const { data: posts, isLoading } = useGetPostsQuery()
  const [newPosts, setNewPosts] = useState<IPost[]>([])
  const [hidden, setHidden] = useState<IPost[]>([])

  useEffect(() => {
    const date7daysFromNow = Date.now() - 7 * 24 * 60 * 60 * 1000

    if (posts) {
      setNewPosts(posts.filter((post) => new Date(post.createdAt).getTime() > date7daysFromNow))
      setHidden(posts.filter((post) => post.isHidden))
    }
  }, [posts])

  const buttons = [
    {
      icon: <ForumIcon sx={{ fontSize: '10vw' }} />,
      label: 'Zobacz wszystkie wpisy',
      link: '/admin/posts'
    },
    {
      icon: <BedroomBabyIcon sx={{ fontSize: '10vw' }} />,
      label: 'Zobacz najnowsze wpisy',
      link: '/'
    },
    {
      icon: <VisibilityOffIcon sx={{ fontSize: '10vw' }} />,
      label: 'Zobacz ukryte wpisy',
      link: '/'
    },
    {
      icon: <HourglassBottomIcon sx={{ fontSize: '10vw' }} />,
      label: 'Zobacz wpisy zawieszonych Użytkowników',
      link: '/'
    },
    {
      icon: <BlockIcon sx={{ fontSize: '10vw' }} />,
      label: 'Zobacz wpisy zablokowanych Użytkowników',
      link: '/'
    }
  ]

  const PostsChart: FC<{ posts: IPost[] }> = ({ posts }) => {
    return (
      <>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: newPosts.length, label: 'Nowe Wpisy' },
                { id: 2, value: hidden.length, label: 'Ukryte wpisy' },
                {
                  id: 3,
                  value: posts.length - newPosts.length - hidden.length,
                  label: 'Pozostałe'
                }
              ]
            }
          ]}
          width={800}
          height={300}
        />
        <Typography color="text.primary">
          Wszystkich wpisów:{' '}
          <Typography component="span" color="secondary" sx={{ fontWeight: 700 }}>
            {posts.length}
          </Typography>
        </Typography>
        <Typography>
          Najnowszy wpis:{' '}
          <Typography component="span" color="secondary" sx={{ fontWeight: 700 }}>
            {posts[0].peak.name} (dodany {formatDate(new Date(posts[0].createdAt))} przez{' '}
            {posts[0].author.username})
          </Typography>
        </Typography>
        <Divider sx={{ my: '2rem' }} />
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Grid container columns={3}>
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

  return <>{isLoading ? <Loader /> : <>{posts ? <PostsChart posts={posts} /> : null}</>}</>
}

export default HomePosts
