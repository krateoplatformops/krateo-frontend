import { apiSlice } from "../../api/apiSlice"
import { getHeaders } from "../../utils/api"
import { getBaseUrl } from "../../utils/config"

export const commonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContent: builder.query({
      query: (data) => ({
        url: `${getBaseUrl()}${data.endpoint}`,
        headers: getHeaders(),
      }),
    }),
    postContent: builder.mutation({
      query: (data) => ({
        url: `${getBaseUrl()}${data.endpoint}`,
        method: 'POST',
        body: data.body,
        headers: getHeaders(),
      }),
    }),
    putContent: builder.mutation({
      query: (data) => ({
        url: `${getBaseUrl()}${data.endpoint}`,
        method: 'PUT',
        body: data.body,
        headers: getHeaders(),
      }),
    }),
    deleteContent: builder.mutation({
      query: (data) => ({
        url: `${getBaseUrl()}${data.endpoint}`,
        method: 'DELETE',
        headers: getHeaders(),
      }),
    }),
  }),
})

// Export the auto-generated hook
export const {
  useGetContentQuery,
  useLazyGetContentQuery,
  usePostContentMutation,
  usePutContentMutation,
  useDeleteContentMutation
 } = commonApiSlice