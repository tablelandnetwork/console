import { createSlice } from '@reduxjs/toolkit'
import { resultSetExample } from '../fake.js'

const resultSetSlice = createSlice({
  name: 'latestResultSet',
  initialState: resultSetExample,
  reducers: {
    resultSetUpdated(state, action) {
      return action.payload
    },
  }
})

export const { resultSetUpdated } = resultSetSlice.actions
export default resultSetSlice.reducer
