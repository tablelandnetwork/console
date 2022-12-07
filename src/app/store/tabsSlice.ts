import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addPendingWrite, updatePendingWrite } from './pendingWritesSlice';
import store from './store';
import { getTablelandConnection } from '../database/connectToTableland';


export const checkQueryType = createAsyncThunk('query/checkQueryType', async (action:any) => {

  const { type } = await sqlparser.normalize(action.query);


  
  return {
    type,
    tab: action.tab
  }
});

export const queryTableland = createAsyncThunk('tablelandQuery/query', async (action) => {

  // @ts-ignore
  const { query, options, tab } = action;
  store.dispatch(setLoadingStatus({tab, loading: true}));

  store.dispatch(updateMessage({tabId: tab, message: null}));

  // @ts-ignore
  await getTablelandConnection();


  const {type} = await sqlparser.normalize(query);

  let res; 
  if(type==="write") {
    store.dispatch(addPendingWrite({
      query: query,
      status: "pending-wallet"
    }));
    // @ts-ignore
    await getTablelandConnection().siwe().catch(e=>{
      console.log("SIWE cancelled");
      console.log(e);
      store.dispatch(updatePendingWrite({
        query: query,
        status: "cancelled"
      }));
    });
    // @ts-ignore
    store.dispatch(updatePendingWrite({
      query: query,
      status: "pending-network"
    }));
    // @ts-ignore
    res = getTablelandConnection().write(query).then(r => {
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

    
    
    return {query};
  } else {
    try {
      // @ts-ignore
      res = await getTablelandConnection().read(query);
    } catch(e) {
      res = {
        error: `${e}`
      }
    }
    
  }
  
  store.dispatch(setLoadingStatus({tab, loading: false}));
  return {...res, ...options, query, tab};
});


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
        type: "any",
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
    updateColumnProperty(state, action) {
      const { columnIndex, property, value, checked, tabId } = action.payload;

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


      state.list[tabId].createColumns[columnIndex][property] = newVal;

    }


  },
  extraReducers(builder) {
    builder.addCase(queryTableland.fulfilled, (state, action) => {   
      const { columns, rows, query, tab, error } = action.payload;
      state.list[tab].columns = columns;
      state.list[tab].rows = rows;
      state.list[tab].query = query;
      state.list[tab].error = error;
    }),
    builder.addCase(checkQueryType.fulfilled, (state, action) => {
      state.list[action.payload.tab].queryType = action.payload.type;
    })
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
