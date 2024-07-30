import { apiSlice } from "../../api/apiSlice";
import { getHeaders } from "../../utils/api";
import { getBaseUrl } from "../../utils/config";

export const appApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAppData: builder.query({
      query: (clientID) => ({
        url: `${getBaseUrl()}/appData/${clientID}`,
        headers: getHeaders(),
      }),
    }),
  }),
})

// Export the auto-generated hook
export const { 
  useGetAppDataQuery,
 } = appApiSlice