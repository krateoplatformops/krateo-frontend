import { apiSlice } from "../../api/apiSlice"
import { getBaseUrl, getHeaders } from "../../utils/api"
import { NotificationType } from "./notificationsSlice"

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationType[], void>({
      query: () => ({
        url: `${getBaseUrl()}/notifications`,
        headers: getHeaders(),
      }),
    }),
    deleteNotification: builder.mutation<string, string>({
      query: (id) => ({
        url: `${getBaseUrl()}/notifications/${id}`,
        method: 'DELETE',
        headers: getHeaders(),
      }),
    }),
  }),
})

// Export the auto-generated hook
export const {
  useGetNotificationsQuery,
  useDeleteNotificationMutation
 } = notificationApiSlice