import { createSlice } from '@reduxjs/toolkit'


const queryListSlice = createSlice({
  name: 'queryList',
  initialState: [],
  reducers: {
    queryRemoved() {

    },
    clearStaged(state, action) {
      return [];
    },
    queryAppended(state, action) {
      state.push(action.payload);
    }
  }
})

export const { queryAppended, clearStaged } = queryListSlice.actions
export default queryListSlice.reducer
