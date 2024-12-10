import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPost, IUser } from '../../src/utils/types'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: 'users'
      }),
      providesTags: ['Users']
    }),
    getSingleUsers: builder.query<IUser, string>({
      query: (id) => ({
        url: `users/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt') || sessionStorage.getItem('jwt')}`
        }
      }),
      providesTags: ['Users']
    }),
    updateUsers: builder.mutation<
      IUser,
      {
        id: string
        email?: string
        password?: string
        isBanned?: boolean
        suspensionTimeout?: Date
        totalSuspensions?: number
        isConfirmed?: boolean
        post?: IPost
      }
    >({
      query: ({
        id,
        email,
        password,
        isBanned,
        suspensionTimeout,
        totalSuspensions,
        isConfirmed,
        post
      }) => ({
        url: `users/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt') || sessionStorage.getItem('jwt')}`
        },
        body: {
          email,
          password,
          isBanned,
          suspensionTimeout,
          totalSuspensions,
          isConfirmed,
          post
        }
      }),
      invalidatesTags: ['Users']
    })
  })
})

export const { useGetUsersQuery, useGetSingleUsersQuery, useUpdateUsersMutation } = usersApi
