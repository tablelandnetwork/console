import { configureStore } from '@reduxjs/toolkit'
import selectedCellReducer from './selectedCellSlice.js';
import createTableReducer from './createTableSlice.js';
import browseReducer from './browseSlice';
import tablesReducer from './tablesSlice';
import pendingWritesReducer from './pendingWritesSlice';
import walletConnectionReducer from './walletConnectionSlice';
import pageStateReducer from './pageStateSlice.js';
import tabsReducer from './tabsSlice';
import sidebarReducer from './sidebarSlice';
import flagsReducer from './flagSlice';


export const store = configureStore({
  reducer: {
    walletConnection: walletConnectionReducer,
    selectedCell: selectedCellReducer,
    createTable: createTableReducer,
    browse: browseReducer,
    tables: tablesReducer,
    pendingWrites: pendingWritesReducer,
    pageState: pageStateReducer,
    tabs: tabsReducer,
    sidebar: sidebarReducer,
    flags: flagsReducer
  }
});


export default store;
