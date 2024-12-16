import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IMessage } from '../../src/utils/types.ts'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL
  }),
  tagTypes: ['Messages'],

  endpoints: (builder) => ({
    createMessages: builder.mutation<
      IMessage[],
      {
        header: string
        message: string
        sendTime: Date
        sender: { id: string }
        recipient: { id: string }
      }
    >({
      query: ({ header, message, sendTime, sender, recipient }) => ({
        url: 'messages',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt') || sessionStorage.getItem('jwt')}`
        },
        body: { header, message, sendTime, sender, recipient }
      }),
      invalidatesTags: ['Messages']
    }),

    updateMessages: builder.mutation<
      IMessage,
      {
        id: string
        openedTime: Date | string | null
        sender: { id: string }
        recipient: { id: string }
      }
    >({
      query: ({ id, openedTime, sender, recipient }) => ({
        url: `messages/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt') || sessionStorage.getItem('jwt')}`
        },
        body: { openedTime, sender, recipient }
      }),
      invalidatesTags: ['Messages']
    }),

    deleteMessages: builder.mutation<IMessage, string>({
      query: (id) => ({
        url: `messages/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt') || sessionStorage.getItem('jwt')}`
        }
      }),
      invalidatesTags: ['Messages']
    })
  })
})

export const { useCreateMessagesMutation, useDeleteMessagesMutation, useUpdateMessagesMutation } =
  messagesApi
