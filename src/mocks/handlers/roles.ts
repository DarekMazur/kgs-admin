import { http, HttpResponse } from 'msw';
import { db } from '../db';

export const handlers = [
  http.get(`/roles`, () => {
    return HttpResponse.json(db.role.getAll, { status: 200 });
  })
];
