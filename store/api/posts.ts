import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPost } from '../../src/utils/types.ts'

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL
  }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => ({
        url: 'posts'
      }),
      providesTags: ['Posts']
    }),
    getSinglePost: builder.query<IPost, string>({
      query: (id) => ({
        url: `posts/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt') || sessionStorage.getItem('jwt')}`
        }
      }),
      providesTags: ['Posts']
    }),
    updatePost: builder.mutation<IPost, { id: string; notes?: string; isHidden?: boolean }>({
      query: ({ id, notes, isHidden }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt') || sessionStorage.getItem('jwt')}`
        },
        body: {
          id,
          notes,
          isHidden
        }
      }),
      invalidatesTags: ['Posts']
    })
  })
})

export const { useGetPostsQuery, useGetSinglePostQuery, useUpdatePostMutation } = postsApi
