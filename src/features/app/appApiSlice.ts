import { apiSlice } from "../../api/apiSlice";
import { getBaseUrl } from "../../utils/api";

export const appApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppData: builder.query({
      query: (clientID) => `${getBaseUrl()}appData/${clientID}`,
    }),
  }),
})

// Export the auto-generated hook
export const { 
  useGetAppDataQuery,
 } = appApiSlice