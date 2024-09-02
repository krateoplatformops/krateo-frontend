import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({});

const customFetchBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  const realErrorCode = (result as unknown as {data: { code: number }})?.data?.code;
  const realErrorMessage = (result as unknown as {data: { error: string }})?.data?.error;

  if (realErrorCode !== undefined && realErrorCode !== 200) {
    const clientErrorRegex = /^4\d{2}$/; // Regex for 4xx client errors
    if (clientErrorRegex.test(String(realErrorCode))) {
      // use transformation to ovewrite the fetch status with right error code
      throw new Error(JSON.stringify({data: {message: realErrorMessage, code: realErrorCode}}));
    }
  }
  return result;
}

export const apiSlice = createApi({
  baseQuery: customFetchBaseQuery,
  endpoints: () => ({}), // all apis will be injected here
})