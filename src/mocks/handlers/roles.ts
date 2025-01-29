import { http, HttpResponse } from 'msw'
import { db } from '../db'

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/roles`, () => {
    return HttpResponse.json(db.role.getAll(), { status: 200 })
  })
]
