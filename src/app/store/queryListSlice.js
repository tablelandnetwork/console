import { createSlice } from '@reduxjs/toolkit'

// TODO: More general name; this isn't just about the cell
const queryListSlice = createSlice({
  name: 'queryList',
  initialState: ["Update hello_5_13 SET name = 'I like cheesecake' where id = 1;"],
  reducers: {
    queryRemoved() {

    },
    queryAppended(state, action) {
      state.push(action.payload);
    }
  }
})

export const { queryAppended } = queryListSlice.actions
export default queryListSlice.reducer
