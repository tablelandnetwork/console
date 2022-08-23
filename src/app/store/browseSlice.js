import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import store from './store';


export const newBrowse = createAsyncThunk('browse/newBrowse', async (action) => {
  
  let res = await tbl.read(`SELECT count(*) from ${action.table};`);
  let count = res.rows[0][0];
  let {columns, rows} = await tbl.read(`SELECT * FROM ${action.table} LIMIT ${50}${0 ? ` offset ${0}` : ''};`)

  return {
    table: action.table,
    offset: 0,
    limit: 50,
    count,
    columns,
    rows,
    status: 'idle',
    init: true
  };
})

const browseSlice = createSlice({
  name: 'browse',
  initialState: {
    table: "",
    offset: 0,
    count: 0,
    limit: 50,
    columns: [],
    rows: [],
    status: 'init',
    init: false
  }, 
  reducers: {
    browseSet (state, action) {
      return action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(newBrowse.pending, (state, action) => {
      state.status = 'loading';
    }),
    builder.addCase(newBrowse.fulfilled, (state, action) => {
      
      return action.payload;
    })
  }
});

window.browseAttempt = (nam) => {
  store.dispatch(newBrowse(nam))
}

export const { browseSet } = browseSlice.actions
export default browseSlice.reducer
