import { useDispatch } from 'react-redux'
import { setGlobalUser } from '../../../store'
import { IUser } from '../types.ts'

export const useMe = () => {
  const dispatch = useDispatch()

  return (id: string) => {
    fetch(`${import.meta.env.VITE_API_URL}/users/${id}`)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        dispatch(setGlobalUser(res))
        return res as IUser
      })
      .catch((err) => {
        console.error(err.message)
        return null
      })
  }
}
