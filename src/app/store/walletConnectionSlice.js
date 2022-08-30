import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  network: 5,
  showStaging: false,
  showMainnets: false
};

const walletConnectionSlice = createSlice({
  name: 'walletConnection',
  initialState, 
  reducers: {
    networkSet(state, action) {
      state.network = action.payload
    },
    setShowStaging(state, action) {
      state.showStaging = action.payload;
    },
    setShowMainnets(state, action) {
      state.showMainnets = action.payload;
    }
  }
});

export const { networkSet, setShowMainnets, setShowStaging } = walletConnectionSlice.actions
export default walletConnectionSlice.reducer
