import { http, HttpResponse } from 'msw'
import { db } from '../db.ts'
import { v4 as uuidv4 } from 'uuid'

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/messages`, () => {
    return HttpResponse.json(
      db.message.getAll().sort((a, b) => b.sendTime.getTime() - a.sendTime.getTime())
    )
  }),

  http.post(`${import.meta.env.VITE_API_URL}/messages`, async ({ request }) => {
    const body = await request.json()

    // @ts-ignore
    const { header, message, sendTime, sender, recipient } = body

    const userSender = db.user.findFirst({
      where: {
        id: {
          equals: sender.id
        }
      }
    })!

    const userRecipient = db.user.findFirst({
      where: {
        id: {
          equals: recipient.id
        }
      }
    })!

    const newMessage = {
      id: uuidv4(),
      header,
      message,
      sendTime,
      openedTime: null,
      sender: {
        id: sender.id,
        username: userSender.username,
        role: userSender.role!.name
      },
      recipient: {
        id: recipient.id,
        username: userRecipient.username,
        role: userRecipient.role!.name
      }
    }

    db.message.create(newMessage)

    db.user.update({
      where: {
        id: {
          equals: sender.id
        }
      },
      data: {
        messages: {
          sent: [...sender.messages.sent, newMessage]
        }
      }
    })

    db.user.update({
      where: {
        id: {
          equals: recipient.id
        }
      },
      data: {
        messages: {
          inbox: [...recipient.messages.inbox, newMessage]
        }
      }
    })

    return HttpResponse.json(newMessage, { status: 200 })
  }),

  http.delete(`${import.meta.env.VITE_API_URL}/messages/:id`, ({ params }) => {
    const { messageId } = params

    const message = db.message.findFirst({
      where: {
        id: {
          equals: messageId as string
        }
      }
    })!

    const reciepent = db.user.findFirst({
      where: {
        id: {
          equals: message.recipient.id
        }
      }
    })!

    db.message.delete({
      where: {
        id: {
          equals: messageId as string
        }
      }
    })

    db.user.update({
      where: {
        id: {
          equals: message.recipient.id
        }
      },
      data: {
        messages: {
          inbox: reciepent.messages.inbox?.filter((message) => message.id !== messageId)
        }
      }
    })

    return HttpResponse.json(db.message.getAll(), { status: 200 })
  })
]
