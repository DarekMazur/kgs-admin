import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser } from '../../src/utils/types'

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
    })
  })
})

export const { useGetUsersQuery, useGetSingleUsersQuery } = usersApi
