import { configureStore } from '@reduxjs/toolkit'
import selectedCellReducer from './selectedCellSlice.js';
import resultSetReducer from './resultSetSlice.js';
import createTableReducer from './createTableSlice.js';
import queryReducer from './querySlice';
import browseReducer from './browseSlice.js';
import modeReducer from './modeSlice.js';
import tablesReducer from './tablesSlice.js';
import pendingWritesReducer from './pendingWritesSlice';
import walletConnectionReducer from './walletConnectionSlice';
import pageStateReducer from './pageStateSlice.js';

export interface Store { 
  mode: string,
}

export const store = configureStore({
  reducer: {
    walletConnection: walletConnectionReducer,
    selectedCell: selectedCellReducer,
    tablelandQuery: resultSetReducer,
    createTable: createTableReducer,
    query: queryReducer,
    browse: browseReducer,
    mode: modeReducer,
    tables: tablesReducer,
    pendingWrites: pendingWritesReducer,
    pageState: pageStateReducer
  }
});


export default store;
