import { createSlice } from '@reduxjs/toolkit'

const modeSlice = createSlice({
  name: 'mode',
  initialState: 'tablelandQuery', 
  reducers: {
    modeSet (state, action) {
      return action.payload
    },
  }
})

export const { modeSet } = modeSlice.actions
export default modeSlice.reducer
