import { http, HttpResponse } from 'msw'
import { db } from '../db'
import { jwtDecode } from 'jwt-decode'

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/users`, () => {
    return HttpResponse.json(
      db.user.getAll().sort((a, b) => b.registrationDate.getTime() - a.registrationDate.getTime())
    )
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
  })
]
