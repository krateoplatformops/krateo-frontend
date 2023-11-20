import { apiSlice } from "../../api/apiSlice"
import { AuthModeType, AuthRequestType, AuthResponseType, LoginFormType } from "../../pages/Login/type"

const baseAuthUrl = import.meta.env.VITE_AUTHN_API_BASE_URL;

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuthModes: builder.query<AuthModeType[], string>({
      // query: (clientID) => `/authModes/${clientID}`,
      query: (clientID) => `${baseAuthUrl}/strategies`,
    }),
    authentication: builder.query<AuthResponseType, {body: LoginFormType, url: string}>({
      query: (data) => ({
        url: `/authn${data.url}`,
        headers: {
          Authorization: `Basic ${btoa(`${data.body.username}:${data.body.password}`)}`
        },
      }),
    }),
    socialAuthentication: builder.query<AuthResponseType, AuthRequestType>({
      query: (body) => ({
        url: `${baseAuthUrl}/${body.url}?name=${body.name}`,
        headers: {
          'X-Auth-Code': body.code,
        }
      }),
    }),
    // getLicenseState: builder.query({
    //   query: (clientID) => `/license/${clientID}`,
    // }),
    // updateLicense: builder.mutation({
    //   query: (body) => ({
    //     url: `/license/${body.clientID}`,
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // getSystemStatus: builder.query({
    //   query: (clientID) => `/systemStatus/${clientID}`,
    // }),
    // getLogs: builder.query({
    //   query: (clientID) => `/logs/${clientID}`,
    // }),
    // getLogDetails: builder.query({
    //   query: ({clientID, logID}) => `/logs/${clientID}/${logID}`,
    // }),
  }),
})

// Export the auto-generated hook
export const {
  useGetAuthModesQuery,
  useLazyAuthenticationQuery,
  useLazySocialAuthenticationQuery
  // useGetPageContentQuery,
  // useGetLicenseStateQuery,
  // useUpdateLicenseMutation,
  // useGetSystemStatusQuery,
  // useGetLogsQuery,
  // useGetLogDetailsQuery
 } = authApiSlice