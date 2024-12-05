import { http, HttpResponse } from 'msw'
import { db } from '../db'

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}users`, () => {
    return HttpResponse.json(db.user.getAll())
  }),

  http.get(`${import.meta.env.VITE_API_URL}/users/login`, ({ request }) => {
    // @ts-expect-error
    if (request.body && request.body.email) {
      const loggedUser = db.user.findFirst({
        where: {
          email: {
            // @ts-expect-error
            equals: request.body.email
          }
        }
      })

      if (!loggedUser) {
        return HttpResponse.json('User not found', { status: 404 })
      }

      // @ts-expect-error
      if (loggedUser.password !== request.body.password) {
        return HttpResponse.json('Authentication failed', { status: 403 })
      }

      const response = {
        data: loggedUser
      }

      return HttpResponse.json(response, { status: 200 })
    }
    return HttpResponse.json('Request failed', { status: 400 })
  })
]
