import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import store from './store';

export const refreshTables = createAsyncThunk('tables/refreshTables', async (action) => {

  const tables = await tbl.list();

  return tables.map(table => {
    table.owned = true;
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
  }
})
export const {  addToStarredTables } = tablesSlice.actions
export default tablesSlice.reducer
