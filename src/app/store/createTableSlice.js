import { createSlice } from '@reduxjs/toolkit'

const createTableSlice = createSlice({
  name: 'createTable',
  initialState: {name: "", columns: [["id", "integer"]]},
  reducers: {
    updateName(state, action) {
      state.name = action.payload;
    },
    addColumn(state, action) {
      state.columns.push(["", "any"]);
    },
    updateColumn(state, action) {
      state.columns[action.payload.columnIndex] = action.payload.newColumn;
    },
    removeColumn(state, action) {
      state.columns.pop();
    }
  }
})

export const { addColumn, updateColumn, updateName, removeColumn } = createTableSlice.actions
export default createTableSlice.reducer
