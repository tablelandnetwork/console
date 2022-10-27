import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  networksToShow: localStorage.getItem("networksToShow") || "mainnet",
  customHost: localStorage.getItem("validator"),
  network: "",
};

const walletConnectionSlice = createSlice({
  name: 'walletConnection',
  initialState, 
  reducers: {
    changeValidatorHost(state, action) {
      state.customHost = action.payload;      
    },
    networkSet(state, action) {
      state.network = action.payload
    },
    changeNetworksToShow(state, action) {
      state.networksToShow = action.payload;
      localStorage.setItem("networksToShow", action.payload);
    }
  }
});

export const { changeValidatorHost, networkSet, changeNetworksToShow } = walletConnectionSlice.actions
export default walletConnectionSlice.reducer
