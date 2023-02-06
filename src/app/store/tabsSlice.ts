import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addPendingWrite, updatePendingWrite } from './pendingWritesSlice';
import store from './store';
import { getTablelandConnection } from '../database/connectToTableland';




interface TablelandQueryDispatch {
  query: string;
  options?: any;
  tab: number;
}

interface InputRow {
  [key: string]: any;
}

interface ResultSet {
  columns: Array<{ name: string }>;
  rows: Array<Array<any>>;
}

interface TablelandQueryResult extends ResultSet {
  error: string;
  tab: number;
  query: string;
}


interface Tab {
  name: string,
  type: string,
  columns?: any[],
  rows?: any[],
  query?: string,
  queryType?: string,
  error?: string,
  status?: string,
  message?: string,
  commiting: boolean,
  prefix?: string,
  createColumns?: CreateColumn[],
  successMessage?: string,
  errorMessage?: string,
  loading?: boolean
}

interface CreateColumn {
  name: string,
  type: string, 
  notNull: boolean, 
  primaryKey: boolean, 
  unique: boolean,
  default:  null | string
}

export const checkQueryType = createAsyncThunk('query/checkQueryType', async (action:any) => {

  const { type } = await sqlparser.normalize(action.query).catch(e => {
    return {type: "invalid"}
  });

  return {
    type,
    tab: action.tab
  }
});

function transformTableData(obj: Array<InputRow>): ResultSet {
  const columns = Object.keys(obj[0]).map(key => ({ name: key }));
  const rows = obj.map(row => Object.values(row));
  return { columns, rows };
}

async function handleTablelandQuery(action: TablelandQueryDispatch): Promise<TablelandQueryResult> {
  let error;
  const { query, tab } = action;
  store.dispatch(setLoadingStatus({tab, loading: true}));

  store.dispatch(updateMessage({tabId: tab, message: null}));

  await getTablelandConnection();


  const {type} = await sqlparser.normalize(query);

  let res; 
  if(type!=="read") {
    store.dispatch(addPendingWrite({
      query: query,
      status: "pending-wallet"
    }));

    store.dispatch(updatePendingWrite({
      query: query,
      status: "pending-network"
    }));

    res = getTablelandConnection().database.prepare(query).all().then(r => {
      store.dispatch(updatePendingWrite({
        query: query,
        status: "complete"
      }));
      store.dispatch(updateMessage({tabId: tab, message: `Query successfully commited to network: ${query}`}));
      store.dispatch(setLoadingStatus({tab, loading: false}));
    }).catch(e=>{
      console.log("Write cancelled");
      console.log(e);
      store.dispatch(updatePendingWrite({
        query: query,
        status: "cancelled"
      }));
      store.dispatch(updateMessage({tabId: tab, error: `Query failed. ${e.message}`}));
      store.dispatch(setLoadingStatus({tab, loading: false}));
    });

    await res;

    
    
    return {query, columns: [], tab, error, rows: []};
  } else {
    try {
      res = await getTablelandConnection().database.prepare(query).all();
    } catch(e) {
      res = {
        error: `${e}`
      }
    }
    
  }

  const { columns, rows } = transformTableData(res.results);
  store.dispatch(setLoadingStatus({tab, loading: false}));
  return {
    columns, 
    rows, 
    tab, 
    query, 
    error 
  }
  

}


export const queryTableland = createAsyncThunk('tablelandQuery/query', handleTablelandQuery);




const createTableTab = {
  name: "Create Table",
  type: "create",
  prefix: "",
  commiting: false,
  createColumns: [{
    name: "id",
    type: "integer", 
    notNull: false, 
    primaryKey: false, 
    unique: false,
    default:  null
  }]
};


const initialState = {
  list: [createTableTab, {
    name: "Query 1",
    type: "query",
    columns: [],
    rows: [],
    query: ``,
    queryType: "read"
  }] as Tab[],
  active: 0
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState, 
  reducers: {
    setLoadingStatus(store, action) {
      store.list[action.payload.tab].loading = action.payload.loading; 
    },
    updateQuery(store, action) {
      store.list[action.payload.tab].query = action.payload.query;
    },
    renameTab(store, action) {
      store.list[action.payload.tab].name = action.payload.name;
    },
    activateTab(store, action) {
      store.active = action.payload;
    },
    closeTab(store, action) { 
      store.list.splice(action.payload, 1);

      if(store.active!=0) {
        store.active--;
      }      
    },
    updateMessage(store, action) {
      const tab = action.payload.tabId;
      store.list[tab].message = action.payload.message;
      store.list[tab].error = action.payload.error;
    },
    newQueryTab(store, action) {     

      store.list.push({
        name: action.payload?.title || "Query",
        type: "query",
        query: action.payload?.query || "",
        columns: [],
        rows: [],
        queryType: "",
        commiting: false
      });
      store.active = store.list.length - 1;
    },
    newCreateTableTab(store, action) {
      store.list.push(createTableTab);
      store.active = store.list.length - 1;
    },

    startCommit(state, action) {
      const tab = action.payload.tabId;
      state.list[tab].commiting = true;
    },
    cancelCommit(state, action) {
      const tab = action.payload.tabId;
      state.list[tab].commiting = false;
    },
    completeCommit(state, action) {
      const tab = action.payload.tabId;

      state.list[tab].successMessage = action.payload.message;
    },
    setPrefix(state, action) {
      const tab = action.payload.tabId;
      state.list[tab].prefix = action.payload.prefix;
    },
    addColumn(state, action) {
      const tab = action.payload.tabId;

      state.list[tab].createColumns.push({
        name: "", 
        type: "text",
        notNull: false, 
        primaryKey: false, 
        unique: false,
        default:  ""
      });
    },
    removeColumn(state, action) {
      const tab = action.payload.tabId;
      if(action.payload.column) {
        state.list[tab].createColumns.splice(action.payload.column, 1);

      } else {
        state.list[tab].createColumns.pop();        
      }
      
    },
    updateColumnProperty(state, { payload: { columnIndex, property, value, checked, tabId }}) {
      const newVal = (property === "notNull" || property === "primaryKey" || property === "unique")
        ? checked
        : value;
    
      state.list[tabId].createColumns[columnIndex][property] = newVal;
    }


  },
  extraReducers(builder) {
    builder.addCase(queryTableland.fulfilled, (state, { payload: { columns, rows, query, tab, error }}) => {
      state.list[tab] = { ...state.list[tab], columns, rows, query, error };
    }),
    builder.addCase(checkQueryType.fulfilled, (state, action) => {
      state.list[action.payload.tab].queryType = action.payload.type;
    });
    builder.addCase(queryTableland.rejected, (state, action: any) => {
      console.log(action);
      const { tab } = action.meta.arg;
      state.list[tab].loading = false;
      state.list[tab].error = action.error.message + (action.error.message == "obj is undefined") ? `${action.error.message }: this may be because you are querying a network to which you aren't connected.` : "";
    });
  }
})

export const { 
  closeTab, 
  newQueryTab, 
  newCreateTableTab, 
  activateTab, 
  updateQuery, 
  renameTab,  
  addColumn, 
  setPrefix, 
  removeColumn, 
  updateColumnProperty, 
  startCommit, 
  cancelCommit,
  completeCommit,
  updateMessage,
  setLoadingStatus
} = tabsSlice.actions;

export default tabsSlice.reducer
