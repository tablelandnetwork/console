import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  network: 0
};

const walletConnectionSlice = createSlice({
  name: 'walletConnection',
  initialState, 
  reducers: {
    networkSet(state, action) {
      state.network = action.payload
    },
  }
})

export const { networkSet } = walletConnectionSlice.actions
export default walletConnectionSlice.reducer
