import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const toastsSlice = createSlice({
  name: "toasts",
  initialState: [],
  reducers: {
    activateToast(state, action) {
      action.payload.id = uuidv4();
      action.payload.active = true;
      // @ts-expect-error Toast slice payload
      state.push(action.payload);
    },
    removeToast(state, action) {
      const i = state.findIndex((item: any) => item.id === action.payload.id);
      (state[i] as any).active = false;
    },
  },
});

export const { activateToast, removeToast } = toastsSlice.actions;
export default toastsSlice.reducer;
