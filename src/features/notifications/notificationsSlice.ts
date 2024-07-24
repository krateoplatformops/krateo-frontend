import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

export type NotificationType = {
  uid: string,
  type: "Normal" | "Warning",
  title: string,
  description: string,
  date: string,
  url: string,
  toRead: boolean,
  kind: string,
  name: string,
  namespace: string,
  apiVersion: string,
}

export type NotificationState = {
  data: NotificationType[],
}

const initialState: NotificationState = {
  data: []
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<{data: NotificationType[]}>) => {
      state.data = action.payload.data;
    },
    setNotificationRead: (state, action: PayloadAction<string>) => {
      state.data = state.data.map(el => (el.uid === action.payload ? {...el, toRead: false} : el))
    },
    appendNotification: (state, action: PayloadAction<NotificationType>) => {
      state.data = [action.payload, ...state.data]
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(el => (el.uid !== action.payload))
    }
  }
});

export const { setNotifications, setNotificationRead, appendNotification, removeNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const selectNotifications = (state: RootState) => state.notifications.data;