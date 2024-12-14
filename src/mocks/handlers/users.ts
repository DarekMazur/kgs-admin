import { http, HttpResponse } from 'msw'
import { db } from '../db'
import { jwtDecode } from 'jwt-decode'
import { IPeak, IPost, IMinMax, IUser } from '../../utils/types.ts'
import { formatDate } from '../../utils/helpers/formatDate.ts'

// @ts-ignore
const instanceofMinMax = (data): data is IMinMax => {
  return !!data?.max
}

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/users`, ({ request }) => {
    const url = new URL(request.url)

    const params = url.searchParams

    //@ts-ignore
    let users: IUser[] = db.user
      .getAll()
      .sort((a, b) => b.registrationDate.getTime() - a.registrationDate.getTime())

    if (params.size > 0) {
      if (params.get('roleId')) {
        if (instanceofMinMax(JSON.parse(<string>params.get('roleId')))) {
          const min = JSON.parse(<string>params.get('roleId')).min
          const max = JSON.parse(<string>params.get('roleId')).max

          users = users.filter((user) => user.role!.id >= (min ?? 1) && user.role!.id <= max)
        } else {
          users = users.filter((user) => user.role && user.role.id === Number(params.get('roleId')))
        }
      }

      if (params.get('registration')) {
        if (instanceofMinMax(JSON.parse(<string>params.get('registration')))) {
          const min = JSON.parse(<string>params.get('registration')).min
          const max = JSON.parse(<string>params.get('registration')).max

          const now = Date.now()

          const startDate = now - max * 24 * 60 * 60 * 1000
          const endDate = min ? now - min * 24 * 60 * 60 * 1000 : now

          users = users.filter(
            (user) =>
              user.registrationDate.getTime() >= startDate &&
              user.registrationDate.getTime() <= endDate
          )
        } else {
          const registrationDate = new Date(
            Date.now() - Number(params.get('registration')) * 24 * 60 * 60 * 1000
          )

          users = users.filter(
            (user) => formatDate(user.registrationDate) === formatDate(registrationDate)
          )
        }
      }

      if (params.get('status')) {
        const status = JSON.parse(<string>params.get('status'))
        const inactive: IUser[] = []
        const suspended: IUser[] = []
        const banned: IUser[] = []

        status.map((param: 'inactive' | 'hidden' | 'banned') =>
          users.map((user) =>
            param === 'inactive'
              ? !user.isConfirmed
                ? inactive.push(user as IUser)
                : false
              : param === 'banned'
                ? user.isBanned
                  ? banned.push(user as IUser)
                  : false
                : user.suspensionTimeout && user.suspensionTimeout.getTime() > Date.now()
                  ? suspended.push(user as IUser)
                  : false
          )
        )

        users = inactive.concat(suspended).concat(banned)
      }
    }

    return HttpResponse.json(users)
  }),

  http.get(`${import.meta.env.VITE_API_URL}/users/:userId`, async ({ request, params }) => {
    const { userId } = params

    if (!userId) {
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

        const user = db.user.findFirst({
          where: {
            id: {
              equals: userId as string
            }
          }
        })

        return HttpResponse.json(user, { status: 200 })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return HttpResponse.json('Authentication failed', { status: 403 })
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return HttpResponse.json('Invalid or expired token', { status: 403 })
    }
  }),

  http.post(`${import.meta.env.VITE_API_URL}/users/login`, async ({ request }) => {
    const body = await request.json()
    // @ts-ignore
    const { email, password } = body
    if (body && email) {
      const loggedUser = db.user.findFirst({
        where: {
          email: {
            equals: email
          }
        }
      })

      if (!loggedUser) {
        return HttpResponse.json('User not found', { status: 404 })
      }

      if (loggedUser.password !== password) {
        return HttpResponse.json('Authentication failed', { status: 403 })
      }

      const token = import.meta.env.VITE_TOKEN_PUBLIC_ADMIN

      const response = {
        data: loggedUser,
        token
      }

      return HttpResponse.json(response, { status: 200 })
    }
    return HttpResponse.json('Request failed', { status: 400 })
  }),

  http.post(`${import.meta.env.VITE_API_URL}/users/me`, async ({ request }) => {
    const body = await request.json()
    // @ts-ignore
    const { id } = body
    const token = request.headers.get('authorization')?.split(' ')[1]

    if (!id) {
      return HttpResponse.json('Authentication failed', { status: 403 })
    }

    if (!token) {
      return HttpResponse.json('Invalid or expired token', { status: 403 })
    }

    const decode = jwtDecode(token)
    // @ts-ignore
    if (!decode || decode.id !== id) {
      return HttpResponse.json('Authentication failed', { status: 403 })
    }

    const user = db.user.findFirst({
      where: {
        id: {
          equals: id as string
        }
      }
    })

    return HttpResponse.json(user, { status: 200 })
  }),

  http.put(`${import.meta.env.VITE_API_URL}/users/:userId`, async ({ request, params }) => {
    interface IUserUpdate {
      id: string
      email?: string
      password?: string
      firstName?: string
      lastName?: string
      description?: string
      avatar?: string
      isBanned?: boolean
      suspensionTimeout?: Date
      totalSuspensions?: number
      isConfirmed?: boolean
      post?: IPost
    }
    const { userId } = params
    const body = (await request.json()) as IUserUpdate

    if (!userId || !body) {
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

        const user = db.user.findFirst({
          where: {
            id: {
              equals: userId as string
            }
          }
        })!

        if (body.post) {
          const postPeak = db.peak.findFirst({
            where: {
              id: {
                equals: body.post.peak.id
              }
            }
          })

          db.post.update({
            where: {
              id: {
                equals: body.post.id
              }
            },
            data: {
              ...body.post,
              peak: postPeak as IPeak
            }
          })
        }

        const updatedPosts = db.post.findMany({
          where: {
            author: {
              id: {
                equals: userId as string
              }
            }
          }
        })

        const updatedUser = {
          id: user.id,
          username: user.username,
          email: body.email ?? user.email,
          password: body.password ?? user.password,
          avatar: body.avatar ?? user.avatar,
          description: body.description ?? user.description,
          messages: user.messages,
          firstName: body.firstName ?? user.firstName,
          lastName: body.lastName ?? user.lastName,
          isBanned: body.isBanned === undefined ? user.isBanned : body.isBanned,
          suspensionTimeout: body.suspensionTimeout ?? user.suspensionTimeout,
          totalSuspensions: body.totalSuspensions ?? user.totalSuspensions,
          isConfirmed: body.isConfirmed === undefined ? user.isConfirmed : body.isConfirmed,
          posts: updatedPosts,
          registrationDate: user.registrationDate,
          role: user.role
        }

        db.user.update({
          where: {
            id: {
              equals: userId as string
            }
          },
          data: updatedUser
        })

        return HttpResponse.json(updatedUser, { status: 200 })
      } catch (error) {
        return HttpResponse.json(`Request failed - ${(error as Error).message}`, { status: 400 })
      }
    } catch (error) {
      return HttpResponse.json(`Request failed - ${(error as Error).message}`, { status: 400 })
    }
  })
]
