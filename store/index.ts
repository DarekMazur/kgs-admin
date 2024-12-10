import { configureStore, createSlice } from '@reduxjs/toolkit'
import { usersApi } from './api/users.ts'
import { IUser } from '../src/utils/types.ts'
import { postsApi } from './api/posts.ts'

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

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    globalUser: globalUserSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware).concat(postsApi.middleware)
})
