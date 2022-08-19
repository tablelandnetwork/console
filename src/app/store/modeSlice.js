import { createSlice } from '@reduxjs/toolkit'

const modeSlice = createSlice({
  name: 'mode',
  initialState: 'execute', 
  reducers: {
    modeSet (state, action) {
      return action.payload
    },
  }
})

export const { modeSet } = modeSlice.actions
export default modeSlice.reducer
