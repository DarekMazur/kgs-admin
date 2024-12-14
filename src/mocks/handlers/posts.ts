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
  }),
  http.put(`${import.meta.env.VITE_API_URL}/posts/:postId`, async ({ request, params }) => {
    const { postId } = params
    interface IPostUpdate {
      id: string
      isHidden?: boolean
      author?: {
        id: string
        isSuspended?: boolean
        isBanned?: boolean
      }
    }

    const body = (await request.json()) as IPostUpdate

    if (!postId) {
      return HttpResponse.json('Request failed', { status: 403 })
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

        if (body.author) {
          const { isBanned, isSuspended, id } = body.author

          const user = db.user.findFirst({
            where: {
              id: {
                equals: id
              }
            }
          })!

          db.user.update({
            where: {
              id: {
                equals: id
              }
            },
            data: {
              suspensionTimeout:
                isSuspended !== undefined && isSuspended
                  ? new Date(7 * 24 * 60 * 60 * 1000 + Date.now())
                  : user.suspensionTimeout,
              totalSuspensions:
                isSuspended !== undefined && isSuspended
                  ? user.totalSuspensions + 1
                  : user.totalSuspensions,
              isBanned: isBanned !== undefined ? isBanned : user.isBanned
            }
          })
        }

        const post = db.post.update({
          where: {
            id: {
              equals: postId as string
            }
          },
          data: {
            isHidden: body.isHidden,
            author: {
              isSuspended: body.author?.isSuspended,
              isBanned: body.author?.isBanned
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
