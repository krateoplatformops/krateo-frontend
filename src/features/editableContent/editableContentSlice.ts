import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

type StateType = "idle" | "loading" | "success" | "error"

export type EditableContentState = {
  prefix: string,
  status: StateType,
  content: React.ReactElement[]
}

const initialState: EditableContentState[] = []

export const editableContentSlice = createSlice({
  name: 'editableContent',
  initialState,
  reducers: {
    setEditableContentState: (state, action: PayloadAction<{prefix: string, status: StateType}>) => {
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
    setEditableContent: (state, action: PayloadAction<EditableContentState>) => {
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
    clearEditableContent: (state, action: PayloadAction<{prefix: string}>) => {
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

export const { setEditableContent, clearEditableContent, setEditableContentState } = editableContentSlice.actions;

export default editableContentSlice.reducer;
export const selectEditableContent = (state: RootState) => state.editableContent;
