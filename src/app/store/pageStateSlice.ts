import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settingsMenu: false,
  transactionsMenu: false,
  chainMenu: false,
  malformedTables: [],
};

const pageStateSlice = createSlice({
  name: "pageState",
  initialState: initialState,
  reducers: {
    closeMenu(state, action) {
      state[action.payload] = false;
    },
    openMenu(state, action) {
      for (let menu in state) {
        state[menu] = false;
      }
      state[action.payload] = true;
    },
    toggleMenu(state, action) {
      state[action.payload] = !state[action.payload];
    },
    addMalformedTable(state, action) {
      // @ts-ignore
      state.malformedTables.push(action.payload);
    },
  },
});

export const { closeMenu, toggleMenu, addMalformedTable } =
  pageStateSlice.actions;
export default pageStateSlice.reducer;
