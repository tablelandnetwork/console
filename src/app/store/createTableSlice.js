import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getTablelandConnection } from '../database/connectToTableland';
import { addPendingWrite, updatePendingWrite } from './pendingWritesSlice';
import store from './store';

export const sendCreateQuery = createAsyncThunk("/send", async (details) => {
  const { query, options } = details;

  const fauxQuery = `CREATE TABLE ${options.prefix} (${query});`;  

  store.dispatch(addPendingWrite({
    query: fauxQuery,
    status: "pending-wallet"
  }));
  const tx = getTablelandConnection().create(query, options).catch(e=>{
    console.log("Create failed");
    console.log(e);
    store.dispatch(updatePendingWrite({
      query: fauxQuery,
      status: "cancelled"
    }));
  });;
  store.dispatch(updatePendingWrite({
    query: fauxQuery,
    status: "pending-network"
  }));
  const txResult = await tx;
  store.dispatch(updatePendingWrite({
    query: fauxQuery,
    status: "complete",
    hash: txResult.txnHash,
    chain: txResult.chainId,
    tableName: txResult.name
  }));

});


export function columnsSummary(columns) {
  let columnsArray = columns.map(column => {
    let columnText = `${column.name} ${column.type}`;
    if(column["notNull"]) {
      columnText += " NOT NULL";
    }
    if(column["primaryKey"]) {
      columnText += " PRIMARY KEY" 
    }
    if(column["unique"]) {
      columnText += " UNIQUE"
    }
    if(column["default"] && column.type==="integer") {
      columnText += ` DEFAULT ${column["default"]}`
    } else if(column["default"]) {
      columnText += ` DEFAULT '${column["default"]}'`;
    }
    return columnText
  });
  return columnsArray.join(", ");
}

const initialState = {name: "untitled_table", columns: [{name: "id", type: "integer", notNull: false, primaryKey: false, unique: false}]};

const createTableSlice = createSlice({
  name: 'createTable',
  initialState,
  reducers: {
    setPrefix(state, action) {
      state.name = action.payload
    },
    addColumn(state, action) {
      state.columns.push({
        name: "", 
        type: "any",
        notNull: false, 
        primaryKey: false, 
        unique: false,
        default:  ""
      });
    },
    removeColumn(state, action) {
      state.columns.pop();
    },
    updateColumnProperty(state, action) {
      const { columnIndex, property, value, checked } = action.payload;

      let newVal;
      switch(property) {
        case "notNull": 
        case "primaryKey":
        case "unique":          
          newVal = checked;
          break;
        case "default":
        case "name": 
        case "type":
          newVal = value;
          break;
      }


      state.columns[columnIndex][property] = newVal;

    }
  }
})

export const { addColumn, removeColumn, setPrefix, updateColumnProperty } = createTableSlice.actions
export default createTableSlice.reducer
