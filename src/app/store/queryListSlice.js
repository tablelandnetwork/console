import { createSlice } from '@reduxjs/toolkit'

// TODO: More general name; this isn't just about the cell
const queryListSlice = createSlice({
  name: 'queryList',
  initialState: ["Update Rigs_01_15 name = 'Allen' where _row_id_ = 1;", "Update Rigs_01_15 name = 'Allen' where _row_id_ = 2;"],
  reducers: {
    queryListUpdated() {

    }
  }
})

export const { queryListUpdated } = queryListSlice.actions
export default queryListSlice.reducer
