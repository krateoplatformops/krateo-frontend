import { apiSlice } from "../../api/apiSlice"
import { getHeaders } from "../../utils/api"
import { getBaseUrl } from "../../utils/config"

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
  involvedObject: {
    kind: string,
    name: string,
    namespace: string,
    apiVersion: string,
  }
}

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<EventType[], void>({
      query: () => ({
        url: `${getBaseUrl("EVENTS")}/events?limit=100`,
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