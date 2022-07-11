import { createSlice } from '@reduxjs/toolkit'
import { storeDefaultSelectedCell } from '../fake.js'

// TODO: selectedCell -> resultSet.Selection || resultSetSelection
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
