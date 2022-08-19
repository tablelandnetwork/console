import { createSlice } from '@reduxjs/toolkit'

const emptyInitialState = {
  query: "",
  columns: [],
  rows: [],
  error: null
}

const resultSetSlice = createSlice({
  name: 'latestResultSet',
  initialState: emptyInitialState,
  reducers: {
    resultSetUpdated(state, action) {
      return action.payload
    },
  }
})

export const { resultSetUpdated } = resultSetSlice.actions
export default resultSetSlice.reducer
