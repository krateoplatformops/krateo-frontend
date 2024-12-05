import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { AuthResponseType } from "../../pages/Login/type";

export type AuthState = Pick<AuthResponseType, "user" | "data">

const initialState: AuthState = {
  user: null,
  data: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      localStorage.setItem("K_user", JSON.stringify(action.payload));
      const { user, data } = action.payload;
      state.user = user;
      state.data = data;
    },
    logout: (state) => {
      localStorage.removeItem("K_user");
      state.user = initialState.user;
      state.data = initialState.data;
    }
  }
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectLoggedUser = (state: RootState) => state.auth?.user;
export const selectKubeConfig = (state: RootState) => state.auth?.data;