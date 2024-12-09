import { http, HttpResponse } from 'msw'
import { db } from '../db'

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/posts`, () => {
    return HttpResponse.json(
      db.post.getAll().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    )
  })
]
