import { configureStore, createSlice } from '@reduxjs/toolkit'
import { usersApi } from './api/users.ts'
import { IUser } from '../src/utils/types.ts'
import { postsApi } from './api/posts.ts'
import { messagesApi } from './api/messages.ts'

export type RootState = ReturnType<typeof store.getState>

const initialUser: IUser | null = null

const globalUserSlice = createSlice({
  name: 'globalUser',
  initialState: initialUser,
  reducers: {
    setGlobalUser: (_state, action) => {
      return action.payload
    }
  }
})

export const { setGlobalUser } = globalUserSlice.actions

export * from './api/users.ts'
export * from './api/posts.ts'
export * from './api/messages.ts'

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    globalUser: globalUserSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(postsApi.middleware)
      .concat(messagesApi.middleware)
})
