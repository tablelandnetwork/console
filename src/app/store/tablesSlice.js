import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import store from './store';

export const refreshTables = createAsyncThunk('tables/refreshTables', async (action) => {

  const tables = await tbl.list();

  return [{name: 'healthbot_1_1'}, ...tables.map(table => {
    table.owned = true;
    return table;
  })];

});


const tablesSlice = createSlice({
  name: 'tables',
  initialState: {
    myTables: ['healthbot_1_1'], 
    starredTables: JSON.parse(localStorage.getItem('star_tables')) || [],
  }, 
  reducers: {
    addToStarredTables: (state, action) => {
      state.starredTables.push(action.payload);
    }
  },
  extraReducers(builder) {
    builder.addCase(refreshTables.fulfilled, (state, action) => {
      state.myTables = action.payload;
    });
  }
})
export const {  addToStarredTables } = tablesSlice.actions
export default tablesSlice.reducer
