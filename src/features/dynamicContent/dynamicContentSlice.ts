import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

type StateType = "idle" | "loading" | "success" | "error"

export type DynamicContentState = {
  prefix: string,
  status: StateType,
  content: React.ReactElement[]
}

const initialState: DynamicContentState[] = []

export const dynamicContentSlice = createSlice({
  name: 'dynamicContent',
  initialState,
  reducers: {
    setDynamicContentState: (state, action: PayloadAction<{prefix: string, status: StateType}>) => {
      if (state.find(el => el.prefix === action.payload.prefix)) {
        state = state.map(el => {
          if (el.prefix === action.payload.prefix) {
            el.status = action.payload.status;
          }
          return el;
        })
      } else {
        state.push({
          prefix: action.payload.prefix,
          status: action.payload.status,
          content: []
        })
      }
    },
    setDynamicContent: (state, action: PayloadAction<DynamicContentState>) => {
      if (state.find(el => el.prefix === action.payload.prefix)) {
        state = state.map(el => {
          if (el.prefix === action.payload.prefix) {
            el.status = action.payload.status;
            el.content = action.payload.content;
          }
          return el;
        })
      } else {
        state.push({
          prefix: action.payload.prefix,
          status: action.payload.status,
          content: action.payload.content
        })
      }
    },
    clearDynamicContent: (state, action: PayloadAction<{prefix: string}>) => {
      state = state.map(el => {
        if (el.prefix === action.payload.prefix) {
          el.status = "idle";
          el.content = [];
        }
        return el;
      })
    },
  }
});

export const { setDynamicContent, clearDynamicContent, setDynamicContentState } = dynamicContentSlice.actions;

export default dynamicContentSlice.reducer;
export const selectDynamicContent = (state: RootState) => state.dynamicContent;
