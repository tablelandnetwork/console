import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getQueryType } from '../database/databaseCalls';

enum QueryTypeState {
  loading = 'loading',
  read = 'read',
  write = 'write',
  invalid = 'invalid'
}

interface QueryState {
  value: string,
  type: QueryTypeState
}

const initialState: QueryState = {
  value: "",
  type: QueryTypeState.read
}

export const checkQueryType = createAsyncThunk('query/checkQueryType', async (query) => {

  return await getQueryType(query);
});

const querySlice = createSlice({
  name: 'query',
  initialState: initialState,
  reducers: {
    setQuery(state, action) {
      state.value = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(checkQueryType.fulfilled, (state, action) => {
      state.type = action.payload;
    }),
    builder.addCase(checkQueryType.pending, (state, action) => {
      state.type = QueryTypeState.loading;
    })
  }
})

export const { setQuery } = querySlice.actions
export default querySlice.reducer
