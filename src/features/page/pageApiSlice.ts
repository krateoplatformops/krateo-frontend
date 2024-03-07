import { apiSlice } from "../../api/apiSlice"

// const getBaseUrl = async () => {
//   const useConfig = import.meta.env.VITE_USE_CONFIG;

//   if (useConfig) {
//     const configFile = await fetch("/config.json");
//     const configJson = await configFile.json();
//     return configJson.api.BFF_API_BASE_URL;
//   } else {
//     return ""
//   }
// }

const getBaseUrl = () => {
  let baseUrl = "";
  const useConfig = import.meta.env.VITE_USE_CONFIG;
  if (useConfig === "true") {
    const ls = localStorage.getItem("K_config");
    if (ls) {
      const configJson = JSON.parse(ls);
      baseUrl = configJson.api.BFF_API_BASE_URL;
    }
  }

  return baseUrl;
}

export const pageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPageContent: builder.query({
      // query: ({clientID, path}) => `/apis/widgets.ui.krateo.io/v1alpha1/cardtemplates?sub=cyberjoker&orgs=devs&namespace=dev-system`,
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