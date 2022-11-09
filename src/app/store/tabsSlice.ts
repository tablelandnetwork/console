import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addPendingWrite, updatePendingWrite } from './pendingWritesSlice';
import store from './store';
import { getQueryType } from '../database/databaseCalls';
import { getTablelandConnection } from '../database/connectToTableland';

enum QueryTypeState {
  loading = 'loading',
  read = 'read',
  write = 'write',
  invalid = 'invalid'
}

interface QueryState {
  value: string,
  type: QueryTypeState
}



export const checkQueryType = createAsyncThunk('query/checkQueryType', async (action:any) => {
  const type = await getQueryType(action.query);
  return {
    type,
    tab: action.tab
  }
});

export const queryTableland = createAsyncThunk('tablelandQuery/query', async (action) => {

  // @ts-ignore
  const { query, options, tab } = action;

  // @ts-ignore
  await getTablelandConnection();
  let isWrite; 

  
  try {
    // @ts-ignore
    await sqlparser.parse(query + "INSERT INTO SOMETHING (id) VALUES ('se');");
    isWrite = true;


  } catch(e) {
    isWrite = false;
  }

  let res; 
  if(isWrite) {
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
    res = getTablelandConnection().write(query).catch(e=>{
      console.log("Write cancelled");
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
    await res;
    store.dispatch(updatePendingWrite({
      query: query,
      status: "complete"
    }));
    
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
  status?: string
}

const initialState = {
  list: [{
    name: "Query 1",
    type: "query",
    columns: [],
    rows: [],
    query: `SELECT * FROM erc20_tokens_80001_2733 WHERE symbol = "FWB";`,
    queryType: "read"
  }] as Tab[],
  active: 0
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState, 
  reducers: {
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
    },
    newQueryTab(store, action) {
      store.list.push({
        name: "Query",
        type: "query",
        query: action.payload?.query || "",
        columns: [],
        rows: [],
        queryType: ""
      });
      store.active = store.list.length - 1;
    },
    newCreateTableTab(store, action) {
      store.list.push({
        name: "Create Table",
        type: "create",
      });
      store.active = store.list.length - 1;
    }
  },
  extraReducers(builder) {
    builder.addCase(queryTableland.pending, (state, action) => {
      // @ts-ignore
      // state.list[action.payload.tab].status = "loading";
    });
    builder.addCase(queryTableland.fulfilled, (state, action) => {   
      const { columns, rows, query, tab } = action.payload;
      state.list[tab].columns = columns;
      state.list[tab].rows = rows;
      state.list[tab].query = query;
    }),
    builder.addCase(checkQueryType.fulfilled, (state, action) => {
      state.list[action.payload.tab].queryType = action.payload.type;
    })
  }
})

export const { closeTab, newQueryTab, newCreateTableTab, activateTab, updateQuery, renameTab } = tabsSlice.actions
export default tabsSlice.reducer
