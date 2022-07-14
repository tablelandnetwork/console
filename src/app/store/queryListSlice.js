import { createSlice } from '@reduxjs/toolkit'


const queryListSlice = createSlice({
  name: 'queryList',
  initialState: [],
  reducers: {
    queryRemoved(state, action) {
      state.splice(action.payload.position, 1);
    },
    clearStaged(state, action) {
      return [];
    },
    queryAppended(state, action) {
      state.push(action.payload);
    }
  }
})

export const { queryAppended, clearStaged, queryRemoved } = queryListSlice.actions
export default queryListSlice.reducer
