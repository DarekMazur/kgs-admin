import { http, HttpResponse } from 'msw'
import { db } from '../db'

export const handlers = [
  http.get(`/posts`, () => {
    return HttpResponse.json(db.post.getAll())
  })
]
