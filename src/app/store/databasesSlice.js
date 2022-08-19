import { createSlice } from '@reduxjs/toolkit'
import { storeDefaultDatabases } from '../fake.js'

const databasesSlice = createSlice({
  name: 'databases',
  initialState: [],
  reducers: {
    databaseRefreshed(state, action) {
      let res = action.payload.map(db => {
        return {
          name: db.name,
          tables: db.tables.map(table => {
            return {name: table.name};
          })
        }
      })
      return res;
    },
  }
})

export const { databaseRefreshed } = databasesSlice.actions
export default databasesSlice.reducer
