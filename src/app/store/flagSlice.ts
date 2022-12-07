import { createSlice } from '@reduxjs/toolkit'

const flagSlice = createSlice({
  name: 'flag',
  initialState: [
    {name: "savedQueries", isActive: localStorage.getItem("flag--savedQueries")==="active"},
    {name: "toggleFlags", isActive: localStorage.getItem("flag--toggleFlags")==="active"},
    {name: "prefabQueries", isActive: localStorage.getItem("flag--prefabQueries")==="active"},
    {name: "accessControl", isActive: localStorage.getItem("flag--accessControl")==="active"},
    {name: "networkFocus", isActive: localStorage.getItem("flag--networkFocus")==="active"},
    {name: "customValidator", isActive: localStorage.getItem("flag--customValidator")==="active"},
    {name: "actionsBar", isActive: localStorage.getItem("flag--actionsBar")==="active"}
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
