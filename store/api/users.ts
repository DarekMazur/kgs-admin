import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUserParams, IPost, IUser, IRole } from '../../src/utils/types'

const getParams = (params: IUserParams) => {
  const keys = Object.keys(params)
  let paramsString = ''
  keys.map((key, index) => {
    paramsString = `${paramsString}${key}=${JSON.stringify(params[key as keyof IUserParams])}${index + 1 < keys.length ? `&` : ''}`
  })

  return paramsString
}

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], IUserParams | void>({
      query: (params) => ({
        url: `users${params ? `?${getParams(params)}` : ''}`
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
        avatar?: string
        firstName?: string
        lastName?: string
        description?: string
        isBanned?: boolean
        suspensionTimeout?: Date
        totalSuspensions?: number
        isConfirmed?: boolean
        post?: IPost
        role?: IRole
      }
    >({
      query: ({
        id,
        email,
        password,
        avatar,
        firstName,
        lastName,
        description,
        isBanned,
        suspensionTimeout,
        totalSuspensions,
        isConfirmed,
        post,
        role
      }) => (
        console.log(suspensionTimeout),
        {
          url: `users/${id}`,
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt') || sessionStorage.getItem('jwt')}`
          },
          body: {
            email,
            password,
            avatar,
            firstName,
            lastName,
            description,
            isBanned,
            suspensionTimeout,
            totalSuspensions,
            isConfirmed,
            post,
            role
          }
        }
      ),
      invalidatesTags: ['Users']
    })
  })
})

export const { useGetUsersQuery, useGetSingleUsersQuery, useUpdateUsersMutation } = usersApi
