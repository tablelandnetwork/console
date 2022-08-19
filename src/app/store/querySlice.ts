import { createSlice } from '@reduxjs/toolkit'

interface QueryState {
  value: string
}

const initialState: QueryState = {
  value: ""
}

const querySlice = createSlice({
  name: 'query',
  initialState: initialState,
  reducers: {
    setQuery(state, action) {
      state.value = action.payload;
    },
  }
})

export const { setQuery } = querySlice.actions
export default querySlice.reducer
