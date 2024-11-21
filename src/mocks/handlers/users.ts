import { http, HttpResponse } from 'msw';
import { db } from '../db';

export const handlers = [
  http.get(`/users`, () => {
      return HttpResponse.json(db.user.getAll(), { status: 403 });
  }),
];
