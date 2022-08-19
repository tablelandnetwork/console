import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addPendingWrite, updatePendingWrite } from './pendingWritesSlice';
import store from './store';


export const queryTableland = createAsyncThunk('tablelandQuery/query', async (action) => {
  const { query, options } = action;

  console.log(action)
  let isWrite; 

  
  try {
    await sqlparser.parse(query + "INSERT INTO SOMETHING (id) VALUES ('se');");
    isWrite = true;


  } catch(e) {
    isWrite = false;
  }

  let res; 
  if(isWrite) {
    store.dispatch(addPendingWrite({
      query: query
    }));
    res = tbl.write(query);
    store.dispatch(updatePendingWrite({
      query: query,
      status: "pending-network"
    }));
    await res;
    store.dispatch(updatePendingWrite({
      query: query,
      status: "complete"
    }));

    return {query};
  } else {
    res = await tbl.read(query);
  }
  console.log({...res, ...options, query})
  return {...res, ...options, query};
});


const emptyInitialState = {
  query: "",
  columns: [],
  rows: [],
  error: null
}

const resultSetSlice = createSlice({
  name: 'tablelandQuery',
  initialState: emptyInitialState,
  reducers: {
    resultSetUpdated(state, action) {
      return action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(queryTableland.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(queryTableland.fulfilled, (state, action) => {
      
      return action.payload;
    }) 
  }
})

export const { resultSetUpdated } = resultSetSlice.actions
export default resultSetSlice.reducer
