import { apiSlice } from "../../api/apiSlice"
import { getBaseUrl, getHeaders } from "../../utils/api"

export type EventType = {
  compositionId: string,
  metadata: {
    uid: string,
    creationTimestamp: string,
  },
  message: string,
  type: "Normal" | "Warning",
  icon: string,
  color: string,
}

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<EventType[], void>({
      query: () => ({
        url: `/events`,
        headers: getHeaders(),
      }),
    }),
    deleteNotification: builder.mutation<string, string>({
      query: (id) => ({
        url: `${getBaseUrl("EVENTS")}/events/${id}`,
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