import store from './store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';



const toastsSlice = createSlice({
  name: 'toasts',
  initialState: [], 
  reducers: {
    activateToast(state, action) {
      action.payload.id = uuidv4();
      action.payload.active = true;
      state.push(action.payload);
    },
    removeToast(state, action) {
      const i = state.findIndex(item => item.id === action.payload.id);
      state[i].active = false;
    }
  }
});

export const { activateToast, removeToast } = toastsSlice.actions;
export default toastsSlice.reducer;
