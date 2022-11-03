import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getTablelandConnection } from '../database/connectToTableland';

export const getSchema = createAsyncThunk('tables/getSchema', async (action: any) => {

  const { tableName } = action;

  const schema = await getTablelandConnection().schema(tableName);

  return {
    schema,
    tableName
  }
});

export const refreshTables = createAsyncThunk('tables/refreshTables', async (action) => {

  const tables = await getTablelandConnection().list();

  return tables.map(table => {
    // table.owned = true;
    return table;
  });

});


const tablesSlice = createSlice({
  name: 'tables',
  initialState: {
    myTables: [], 
    starredTables: JSON.parse(localStorage.getItem('star_tables')) || [],
    refreshing: false
  }, 
  reducers: {
    addToStarredTables: (state, action) => {
      state.starredTables.push(action.payload);
    }
  },
  extraReducers(builder) {
    builder.addCase(refreshTables.pending, (state, action) => {
      state.refreshing = true;
    });
    builder.addCase(refreshTables.fulfilled, (state, action) => {
      state.refreshing = false;
      state.myTables = action.payload;
    });
    builder.addCase(getSchema.fulfilled, (state, action) => {
      const key = state.myTables.findIndex(table => table.name === action.payload.tableName);
      state.myTables[key].schema = action.payload.schema;
    });
  }
})
export const {  addToStarredTables } = tablesSlice.actions
export default tablesSlice.reducer
