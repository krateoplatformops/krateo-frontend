import { apiSlice } from "../../api/apiSlice";
import { getBaseUrl, getHeaders } from "../../utils/api";

export const appApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppData: builder.query({
      query: (clientID) => ({
        url: `${getBaseUrl()}appData/${clientID}`,
        headers: getHeaders(),
      }),
    }),
  }),
})

// Export the auto-generated hook
export const { 
  useGetAppDataQuery,
 } = appApiSlice