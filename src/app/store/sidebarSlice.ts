import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "default",
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebarMode(state, action) {
      state.mode = action.payload;
    },
  },
});

export const { setSidebarMode } = sidebarSlice.actions;
export default sidebarSlice.reducer;
