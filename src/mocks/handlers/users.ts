import { http, HttpResponse } from 'msw'
import { db } from '../db'

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/users`, () => {
    return HttpResponse.json(db.user.getAll())
  }),

  http.get(`${import.meta.env.VITE_API_URL}/users/:userId`, async ({ params }) => {
    const { userId } = params

    if (!userId) {
      return HttpResponse.json('Request failed', { status: 400 })
    }

    const user = db.user.findFirst({
      where: {
        id: {
          equals: userId as string
        }
      }
    })

    return HttpResponse.json(user, { status: 200 })
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

      const token = import.meta.env.VITE_TOKEN_PUBLIC_USER

      const response = {
        data: loggedUser,
        token
      }

      return HttpResponse.json(response, { status: 200 })
    }
    return HttpResponse.json('Request failed', { status: 400 })
  })
]
