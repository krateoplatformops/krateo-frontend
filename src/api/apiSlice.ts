import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({});

const customFetchBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  const realErrorCode = (result as unknown as {data: { code: number }})?.data?.code;

  if (realErrorCode !== undefined && realErrorCode !== 200) {
    const clientErrorRegex = /^4\d{2}$/; // Regex for 4xx client errors
    if (clientErrorRegex.test(String(realErrorCode))) {
      console.log("ERR FOUND!", realErrorCode, result);
      // use transformation to ovewrite the fetch status with right error code
      return {
        data: {
          code : realErrorCode,
        }
      }
    }
  }
  return result;
}

export const apiSlice = createApi({
  baseQuery: customFetchBaseQuery,
  endpoints: () => ({}), // all apis will be injected here
})