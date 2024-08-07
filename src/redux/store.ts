import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../features/auth/authSlice';
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import dataListSlice from "../features/dataList/dataListSlice";
import dynamicContentSlice from "../features/dynamicContent/dynamicContentSlice";
import editableContentSlice from "../features/editableContent/editableContentSlice";
import notificationsSlice from "../features/notifications/notificationsSlice";


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    dataList: dataListSlice,
    dynamicContent: dynamicContentSlice,
    editableContent: editableContentSlice,
    notifications: notificationsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);