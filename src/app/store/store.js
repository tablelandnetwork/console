import { configureStore } from '@reduxjs/toolkit'
import databasesReducer from './databasesSlice.js';
import selectedCellReducer from './selectedCell.js';
import queryListReducer from './queryListSlice.js';
import resultSetReducer from './resultSetSlice.js';
import createTableReducer from './createTableSlice.js';

// TODO: Create shared store selector functions
// TODO: Identifier for tables & dbs that aren't based on position in array
// TODO: Multiple selctions / history of selections

export const store = configureStore({
  reducer: {
    databases: databasesReducer,
    selectedCell: selectedCellReducer,
    queryList: queryListReducer,
    latestResultSet: resultSetReducer,
    createTable: createTableReducer
  }
});


export default store;
