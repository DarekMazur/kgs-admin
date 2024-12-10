import { http, HttpResponse } from 'msw'
import { db } from '../db'
import { jwtDecode } from 'jwt-decode'

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/posts`, () => {
    return HttpResponse.json(
      db.post.getAll().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    )
  }),
  http.get(`${import.meta.env.VITE_API_URL}/posts/:postId`, async ({ request, params }) => {
    const { postId } = params

    if (!postId) {
      return HttpResponse.json('Request failed', { status: 400 })
    }

    try {
      const token = request.headers.get('authorization')?.split(' ')[1]
      if (!token) {
        return HttpResponse.json('Invalid or expired token', { status: 403 })
      }

      try {
        const decode = jwtDecode(token)

        if (!decode) {
          return HttpResponse.json('Authentication failed', { status: 403 })
        }

        const post = db.post.findFirst({
          where: {
            id: {
              equals: postId as string
            }
          }
        })

        return HttpResponse.json(post, { status: 200 })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return HttpResponse.json('Authentication failed', { status: 403 })
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return HttpResponse.json('Invalid or expired token', { status: 403 })
    }
  })
]
