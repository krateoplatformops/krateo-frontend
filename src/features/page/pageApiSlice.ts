import { apiSlice } from "../../api/apiSlice"
import { getBaseUrl } from "../../utils/api"

export const pageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPageContent: builder.query({
      query: ({username, group}) => `${getBaseUrl()}/apis/layout.ui.krateo.io/rows/two?sub=${username}&orgs=${group}&namespace=demo-system`,
    }),
    // getFormContent: builder.query({
    //   query: ({username, group}) => `${getBaseUrl()}/apis/widgets.ui.krateo.io/v1alpha1/formtemplates/fireworksapp?sub=${username}&orgs=${group}&namespace=demo-system`,
    // }),
  }),
})

// Export the auto-generated hook
export const {
  useGetPageContentQuery,
  // useGetFormContentQuery
 } = pageApiSlice