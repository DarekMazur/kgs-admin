import { faker } from '@faker-js/faker';
import { handlers } from './handlers';
import { db } from './db.ts';
import {setupWorker} from "msw/browser";

declare global {
  interface Window {
    mocks: unknown;
  }
}

export const worker = setupWorker(...handlers);

worker.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url);
});

const demoUserRegistrationTime = faker.date.past().getTime();
const demoAdminRegistrationTime = faker.date.past().getTime();
const demoModRegistrationTime = faker.date.past().getTime();
const demoUserId = faker.string.uuid();
const demoAdminId = faker.string.uuid();
const demoModId = faker.string.uuid();

const createRoles = () => {
  db.role.create({ id: 0, name: 'Super Administrator', type: 'superAdmin' });
  db.role.create({ id: 1, name: 'Administrator', type: 'admin' });
  db.role.create({ id: 2, name: 'Moderator', type: 'mod' });
  db.role.create({ id: 3, name: 'User', type: 'user' });
};

const createPeaks = () => {
  for (let i = 0; i < faker.number.int({ min: 25, max: 40 }); i += 1) {
    db.peak.create();
  }
};

const createUsers = () => {
  db.user.create({
    id: demoUserId,
    email: 'tu@mail.com',
    password: '123',
    username: 'TestUser',
    registrationDate: demoUserRegistrationTime,
    suspensionTimeout: undefined,
  });
  db.user.create({
    id: demoAdminId,
    email: 'ta@mail.com',
    password: '123',
    username: 'TestAdmin',
    registrationDate: demoAdminRegistrationTime,
    suspensionTimeout: undefined,
  });
  db.user.create({
    id: demoModId,
    email: 'tm@mail.com',
    password: '123',
    username: 'TestModerator',
    registrationDate: demoModRegistrationTime,
    suspensionTimeout: undefined,
    isConfirmed: faker.datatype.boolean({ probability: 0.8 }),
  });
  for (let i = 0; i < faker.number.int({ min: 55, max: 70 }); i += 1) {
    db.user.create({
      suspensionTimeout: undefined,
      registrationDate:
        faker.number.int({ min: 0, max: 3 }) === 0
          ? faker.date.recent().getTime()
          : faker.date.past().getTime(),
    });
  }
};

const createPosts = () => {
  for (let i = 0; i < faker.number.int({ min: 100, max: 500 }); i += 1) {
    db.post.create();
  }
};

createRoles();
createPeaks();
createUsers();
createPosts();

window.mocks = {
  getUsers: () => db.user.getAll(),
  getPosts: () => db.post.getAll(),
  getPeaks: () => db.peak.getAll(),
  getRoles: () => db.role.getAll(),
};

