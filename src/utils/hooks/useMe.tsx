import { useDispatch } from 'react-redux'
import { setGlobalUser } from '../../../store'
import { IMessage, IUser } from '../types.ts'

export const useMe = () => {
  const dispatch = useDispatch()

  return async (id: string, token: string) => {
    await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.statusText)
        }
        return res.json()
      })
      .then((res) => {
        if (res.role.id < 4) {
          const me = structuredClone(res)

          const sortedMessages = {
            inbox: me.messages.inbox?.sort(
              (a: IMessage, b: IMessage) =>
                new Date(b.sendTime).getTime() - new Date(a.sendTime).getTime()
            ),
            sent: me.messages.sent?.sort(
              (a: IMessage, b: IMessage) =>
                new Date(b.sendTime).getTime() - new Date(a.sendTime).getTime()
            )
          }

          dispatch(setGlobalUser({ ...me, messages: sortedMessages }))
          return res as IUser
        }

        dispatch(setGlobalUser(null))
        return null
      })
      .catch((err) => {
        console.error(err.message)
        return null
      })
  }
}
