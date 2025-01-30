import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IRole } from '../../src/utils/types'

export const rolesApi = createApi({
  reducerPath: 'rolesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL
  }),
  tagTypes: ['Roles'],
  endpoints: (builder) => ({
    getRoles: builder.query<IRole[], void>({
      query: () => ({
        url: 'roles'
      }),
      providesTags: ['Roles']
    })
  })
})

export const { useGetRolesQuery } = rolesApi
