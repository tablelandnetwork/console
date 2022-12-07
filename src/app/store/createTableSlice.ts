import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getTablelandConnection } from '../database/connectToTableland';
import { addPendingWrite, updatePendingWrite } from './pendingWritesSlice';
import store from './store';
import { startCommit, cancelCommit, completeCommit, updateMessage } from '../store/tabsSlice';
import { CreateTableReceipt } from '@tableland/sdk';
import { refreshTables } from './tablesSlice';

export const sendCreateQuery = createAsyncThunk("/send", async (details:any) => {
  const { query, options, tab } = details;

  const fauxQuery = `CREATE TABLE ${options.prefix} (${query});`;  
  store.dispatch(startCommit({tabId: tab}));
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
    store.dispatch(cancelCommit({tabId:tab}));
    store.dispatch(updateMessage({tabId: tab, error: e.message}));
  });;
  store.dispatch(updatePendingWrite({
    query: fauxQuery,
    status: "pending-network"
  }));
  const txResult = await tx as CreateTableReceipt; 
  store.dispatch(updatePendingWrite({
    query: fauxQuery,
    status: "complete",
    hash: txResult.txnHash,
    chain: txResult.chainId,
    tableName: txResult.name
  }));

  store.dispatch(completeCommit({tabId: tab, message: `${txResult.name} created.`}));
  store.dispatch(refreshTables());

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

const initialState = {
  name: "untitled_table", 
  commiting: false,
  columns: [{
      name: "id",
      type: "integer", 
      notNull: false, 
      primaryKey: false, 
      unique: false,
      default:  null
  }]
};

const createTableSlice = createSlice({
  name: 'createTable',
  initialState,
  reducers: {
    startCommit(state, action) {
      state.commiting = true;
    },
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
