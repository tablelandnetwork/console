import { configureStore } from '@reduxjs/toolkit'
import databasesReducer from './databasesSlice.js';
import selectedCellReducer from './selectedCellSlice.js';
import queryListReducer from './queryListSlice.js';
import resultSetReducer from './resultSetSlice.js';
import createTableReducer from './createTableSlice.js';
import queryReducer from './querySlice';
import browseReducer from './browseSlice.js';
import modeReducer from './modeSlice.js';
import tablesReducer from './tablesSlice.js';
import pendingWritesReducer from './pendingWritesSlice';

export interface Store { 
  mode: string,
}

export const store = configureStore({
  reducer: {
    databases: databasesReducer,
    selectedCell: selectedCellReducer,
    queryList: queryListReducer,
    tablelandQuery: resultSetReducer,
    createTable: createTableReducer,
    query: queryReducer,
    browse: browseReducer,
    mode: modeReducer,
    tables: tablesReducer,
    pendingWrites: pendingWritesReducer
  }
});


export default store;
