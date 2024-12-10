import { faker } from '@faker-js/faker'
import { handlers } from './handlers'
import { db } from './db.ts'
import { setupWorker } from 'msw/browser'
import { IPeak } from '../utils/types.ts'

declare global {
  interface Window {
    mocks: unknown
  }
}

export const worker = setupWorker(...handlers)

worker.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url)
})

const demoUserRegistrationTime = faker.date.past()
const demoAdminRegistrationTime = faker.date.past()
const demoModRegistrationTime = faker.date.past()
const demoSuperAdminRegistrationTime = faker.date.past()
const demoUserId = faker.string.uuid()
const demoAdminId = faker.string.uuid()
const demoModId = faker.string.uuid()
const demoSuperAdminId = faker.string.uuid()

const createRoles = () => {
  db.role.create({ id: 1, name: 'Super Administrator', type: 'superAdmin' })
  db.role.create({ id: 2, name: 'Administrator', type: 'admin' })
  db.role.create({ id: 3, name: 'Moderator', type: 'mod' })
  db.role.create({ id: 4, name: 'Użytkownik', type: 'user' })
}

const createPeaks = () => {
  for (let i = 0; i < faker.number.int({ min: 25, max: 40 }); i += 1) {
    db.peak.create()
  }
}

const createUsers = () => {
  db.user.create({
    id: demoUserId,
    email: 'tu@mail.com',
    password: '123',
    username: 'TestUser',
    registrationDate: demoUserRegistrationTime,
    isBanned: false,
    suspensionTimeout: undefined
  })
  db.user.create({
    id: demoAdminId,
    email: 'ta@mail.com',
    password: '123',
    username: 'TestAdmin',
    registrationDate: demoAdminRegistrationTime,
    isBanned: false,
    suspensionTimeout: undefined
  })
  db.user.create({
    id: demoModId,
    email: 'tm@mail.com',
    password: '123',
    username: 'TestModerator',
    registrationDate: demoModRegistrationTime,
    isBanned: false,
    suspensionTimeout: undefined,
    isConfirmed: faker.datatype.boolean({ probability: 0.8 })
  })
  db.user.create({
    id: demoSuperAdminId,
    email: 'tsa@mail.com',
    password: '123',
    username: 'TestSuperAdmin',
    registrationDate: demoSuperAdminRegistrationTime,
    isBanned: false,
    suspensionTimeout: undefined
  })
  for (let i = 0; i < faker.number.int({ min: 55, max: 70 }); i += 1) {
    db.user.create({
      suspensionTimeout: faker.datatype.boolean({ probability: 0.1 })
        ? faker.date.future()
        : undefined,
      registrationDate:
        faker.number.int({ min: 0, max: 3 }) === 0 ? faker.date.recent() : faker.date.past()
    })
  }
}

const createPosts = () => {
  for (let i = 0; i < faker.number.int({ min: 100, max: 500 }); i += 1) {
    db.post.create({
      createdAt:
        faker.number.int({ min: 0, max: 3 }) === 0 ? faker.date.recent() : faker.date.past(),
      isHidden: faker.datatype.boolean({ probability: 0.1 })
    })
  }
}

createRoles()
createPeaks()
createUsers()
createPosts()

const users = db.user.getAll()
const posts = db.post.getAll()
const roles = db.role.getAll()

const getID = (model: 'user' | 'peak' | 'post') => {
  const length = db[model].count()

  const element = db[model].getAll()[Math.floor(Math.random() * length)]

  return element.id
}

const updatePosts = () => {
  posts.forEach((post) => {
    const author = db.user.findFirst({
      where: {
        id: {
          equals: getID('user')
        }
      }
    })

    const peak = db.peak.findFirst({
      where: {
        id: {
          equals: getID('peak')
        }
      }
    })

    db.post.update({
      where: {
        id: {
          equals: post.id
        }
      },
      data: {
        author: {
          id: author?.id,
          username: author?.username,
          firstName: author?.firstName,
          avatar: author?.avatar,
          isSuspended:
            !!author?.suspensionTimeout && author?.suspensionTimeout > new Date(Date.now()),
          isBanned: author?.isBanned,
          role: author?.role?.id ?? 3
        },
        peak: peak as IPeak
      }
    })
  })
}

const updateUsers = () => {
  users.forEach((author) => {
    const postsList = db.post.findMany({
      where: {
        author: {
          id: {
            equals: author.id
          }
        }
      }
    })

    db.user.update({
      where: {
        id: {
          equals: author.id
        }
      },
      data: {
        suspensionTimeout: undefined,
        role: roles[faker.number.int({ min: 0, max: roles.length - 1 })],
        posts: postsList || []
      }
    })
  })
}

const updateDemoUser = () => {
  db.user.update({
    where: {
      id: {
        equals: demoUserId
      }
    },
    data: {
      suspensionTimeout: undefined,
      isConfirmed: true,
      role: db.role.findFirst({
        where: {
          id: {
            equals: 3
          }
        }
      })!
    }
  })
  db.user.update({
    where: {
      id: {
        equals: demoAdminId
      }
    },
    data: {
      suspensionTimeout: undefined,
      isConfirmed: true,
      role: db.role.findFirst({
        where: {
          id: {
            equals: 1
          }
        }
      })!
    }
  })
  db.user.update({
    where: {
      id: {
        equals: demoModId
      }
    },
    data: {
      suspensionTimeout: undefined,
      isConfirmed: true,
      role: db.role.findFirst({
        where: {
          id: {
            equals: 2
          }
        }
      })!
    }
  })
}

const createDemoUsersWithAllPeaks = async () => {
  const peaks = db.peak.getAll()

  const shuffle = <T>(array: T[]) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const shuffledPeaks = shuffle(peaks)

  const demoUserID = faker.string.uuid()
  const demoUserUsername = faker.internet.username()
  const demoUserFirstName = faker.person.firstName()
  const demoUserAvatar = faker.image.avatar()

  db.user.create({
    id: demoUserID,
    username: demoUserUsername,
    firstName: demoUserFirstName,
    avatar: demoUserAvatar,
    suspensionTimeout: undefined,
    isConfirmed: true
  })

  for (let i = 0; i < peaks.length; i += 1) {
    db.post.create({
      author: {
        id: demoUserID,
        username: demoUserUsername,
        firstName: demoUserFirstName,
        avatar: demoUserAvatar
      },
      peak: db.peak.findFirst({
        where: {
          id: {
            equals: shuffledPeaks[i].id
          }
        }
      })!
    })
  }

  db.user.create({
    role: roles[faker.number.int({ min: 0, max: roles.length - 1 })],
    registrationDate:
      faker.number.int({ min: 0, max: 3 }) === 0 ? faker.date.recent() : faker.date.past(),
    suspensionTimeout: undefined,
    isConfirmed: true,
    posts: db.post.findMany({
      where: {
        author: {
          id: {
            equals: demoUserID
          }
        }
      }
    })
  })
}

const updateUsersWithNoRole = () => {
  const usersWithNoRole = db.user.getAll().filter((user) => user.role === undefined)

  usersWithNoRole.forEach((user) => {
    db.user.update({
      where: {
        id: {
          equals: user.id
        }
      },
      data: {
        isConfirmed: true,
        suspensionTimeout: undefined,
        role: roles[faker.number.int({ min: 0, max: roles.length - 1 })]
      }
    })
  })
}

updatePosts()
updateUsers()

updateDemoUser()

for (let i = 0; i < faker.number.int({ min: 3, max: 10 }); i += 1) {
  await createDemoUsersWithAllPeaks()
}

updateUsersWithNoRole()

window.mocks = {
  getUsers: () => db.user.getAll(),
  getPosts: () => db.post.getAll(),
  getPeaks: () => db.peak.getAll(),
  getRoles: () => db.role.getAll()
}
