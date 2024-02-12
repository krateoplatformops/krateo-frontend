import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../redux/store';

export const baseQuery = fetchBaseQuery({
  prepareHeaders: (headers, { getState }) => {
    const kubeConfig = (getState()  as RootState).auth?.data;
    if (kubeConfig) {
      // headers.set("authorization", `Bearer ${token}`);
      /**
       * INSERT HERE HOW TO SEND LOGIN INFO TO APIs
       */
    }
    return headers;
  }
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}), // all apis will be injected here
})