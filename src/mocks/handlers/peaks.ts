import { http, HttpResponse } from 'msw';
import { db } from '../db';

export const handlers = [
  http.get(`/peaks`, () => {
    return HttpResponse.json(db.peak.getAll() ,{ status: 200 });
  }),
];
