import { createSlice } from '@reduxjs/toolkit'


const storeDefaultSelectedCell = {
  database: 0,
  table: 0,
  row: 0,
  column: 0
};

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
