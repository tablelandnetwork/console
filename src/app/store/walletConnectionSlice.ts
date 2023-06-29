import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  networksToShow: localStorage.getItem("networksToShow") ?? "mainnet",
  customHost: localStorage.getItem("validator"),
  connected: false,
};

const walletConnectionSlice = createSlice({
  name: "walletConnection",
  initialState,
  reducers: {
    changeValidatorHost(state, action) {
      state.customHost = action.payload;
    },
    changeNetworksToShow(state, action) {
      state.networksToShow = action.payload;
      localStorage.setItem("networksToShow", action.payload);
    },
    setConnected(state, action) {
      state.connected = action.payload;
    },
  },
});

export const { changeValidatorHost, changeNetworksToShow, setConnected } =
  walletConnectionSlice.actions;
export default walletConnectionSlice.reducer;
