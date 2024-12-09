import { PieChart } from '@mui/x-charts/PieChart'
import { useGetPostsQuery } from '../../../../store'
import { useEffect, useState } from 'react'
import { IPost } from '../../../utils/types.ts'

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

  return (
    <>
      {isLoading ? null : (
        <>
          {posts ? (
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
            </>
          ) : null}
        </>
      )}
    </>
  )
}

export default HomePosts
