import { configureStore } from '@reduxjs/toolkit'
import selectedCellReducer from './selectedCellSlice.js';
import createTableReducer from './createTableSlice.js';
import queryReducer from './querySlice';
import browseReducer from './browseSlice.js';
import tablesReducer from './tablesSlice.js';
import pendingWritesReducer from './pendingWritesSlice';
import walletConnectionReducer from './walletConnectionSlice';
import pageStateReducer from './pageStateSlice.js';
import tabsReducer from './tabsSlice';


export const store = configureStore({
  reducer: {
    walletConnection: walletConnectionReducer,
    selectedCell: selectedCellReducer,
    createTable: createTableReducer,
    browse: browseReducer,
    tables: tablesReducer,
    pendingWrites: pendingWritesReducer,
    pageState: pageStateReducer,
    tabs: tabsReducer
  }
});


export default store;
