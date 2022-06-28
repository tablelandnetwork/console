import { createSlice } from '@reduxjs/toolkit'
import { storeDefaultDatabases } from '../fake.js'

const databasesSlice = createSlice({
  name: 'databases',
  initialState: storeDefaultDatabases,
  reducers: {
    databaseRefreshed(state, action) {
      return action.payload
    },
  }
})

export const { databaseRefreshed } = databasesSlice.actions
export default databasesSlice.reducer
