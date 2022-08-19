import { configureStore } from '@reduxjs/toolkit'
import databasesReducer from './databasesSlice.js';
import selectedCellReducer from './selectedCellSlice.js';
import queryListReducer from './queryListSlice.js';
import resultSetReducer from './resultSetSlice.js';
import createTableReducer from './createTableSlice.js';
import queryReducer from './querySlice.js';
import browseReducer from './browseSlice.js';
import modeReducer from './modeSlice.js';
import tablesReducer from './tablesSlice.js';

// TODO: Create shared store selector functions
// TODO: Identifier for tables & dbs that aren't based on position in array
// TODO: Multiple selctions / history of selections

export const store = configureStore({
  reducer: {
    databases: databasesReducer,
    selectedCell: selectedCellReducer,
    queryList: queryListReducer,
    latestResultSet: resultSetReducer,
    createTable: createTableReducer,
    query: queryReducer,
    browse: browseReducer,
    mode: modeReducer,
    tables: tablesReducer
  }
});


export default store;
