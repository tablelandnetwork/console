import { createSlice } from '@reduxjs/toolkit'

const flagSlice = createSlice({
  name: 'flag',
  initialState: [
    {name: "savedQueries", isActive: localStorage.getItem("flag--savedQueries")==="active"},
    {name: "toggleFlags", isActive: localStorage.getItem("flag--toggleFlags")==="active"}
  ], 
  reducers: {
    setFlag(state, action) {
      let keyIndex = state.findIndex(flag => flag.name === action.payload.name);
      localStorage.setItem(`flag--${action.payload.name}`, action.payload.isActive ? "active" : "");
      state[keyIndex].isActive = action.payload.isActive;
    },
  }
});

export const { setFlag } = flagSlice.actions;
export default flagSlice.reducer;
