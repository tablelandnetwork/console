import { createSlice } from '@reduxjs/toolkit'
import { storeDefaultSelectedCell } from '../fake.js'

// TODO: More general name; this isn't just about the cell
const selectedCellSlice = createSlice({
  name: 'selectedCell',
  initialState: storeDefaultSelectedCell,
  reducers: {
    selectedCellUpdated(state, action) {
      return action.payload
    },
  }
})

export const { selectedCellUpdated } = selectedCellSlice.actions
export default selectedCellSlice.reducer
