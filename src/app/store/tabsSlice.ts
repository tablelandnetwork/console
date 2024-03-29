import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { type Result } from "@tableland/sdk";
import { getTablelandConnection } from "../database/connectToTableland";
import { addPendingWrite, updatePendingWrite } from "./pendingWritesSlice";
import store from "./store";

interface TablelandQueryDispatch {
  query: string;
  options?: any;
  tabId: string;
}

type InputRow = Record<string, any>;

interface ResultSet {
  columns: Array<{ name: string }>;
  rows: any[][];
}

export type UUID = string;

interface TablelandQueryResult extends ResultSet {
  error: string;
  tabId: string;
  query: string;
}

interface Tab {
  tabId: string;
  name: string;
  type: string;
  columns?: any[];
  rows?: any[];
  query?: string;
  queryType?: string;
  error?: string;
  status?: string;
  message?: string;
  committing: boolean;
  prefix?: string;
  createColumns?: CreateColumn[];
  successMessage?: string;
  errorMessage?: string;
  loading?: boolean;
}

interface CreateColumn {
  name: string;
  type: string;
  notNull: boolean;
  primaryKey: boolean;
  unique: boolean;
  default: null | string;
}

export const checkQueryType = createAsyncThunk(
  "query/checkQueryType",
  async (action: any) => {
    const { type } = await sqlparser.normalize(action.query).catch((e) => {
      return { type: "invalid" };
    });

    return {
      type,
      tabId: action.tabId,
    };
  }
);

function transformTableData(obj: InputRow[]): ResultSet {
  if (obj.length < 1) return { columns: [], rows: [] };
  const columns = Object.keys(obj[0]).map((key) => ({ name: key }));
  const rows = obj.map((row) => Object.values(row));
  return { columns, rows };
}

async function handleTablelandQuery(
  action: TablelandQueryDispatch
): Promise<TablelandQueryResult | undefined> {
  let error;
  const { query, tabId } = action;
  store.dispatch(setLoadingStatus({ tabId, loading: true }));
  store.dispatch(updateMessage({ tabId, message: null }));
  getTablelandConnection();

  const { type } = await sqlparser.normalize(query);

  let res;
  if (type !== "read") {
    store.dispatch(
      addPendingWrite({
        query,
        status: "pending-wallet",
      })
    );

    store.dispatch(
      updatePendingWrite({
        query,
        status: "pending-network",
      })
    );

    res = getTablelandConnection()
      .database.prepare(query)
      .all()
      .then((r) => {
        store.dispatch(
          updatePendingWrite({
            query,
            status: "complete",
          })
        );
        store.dispatch(
          updateMessage({
            tabId,
            message: `Query successfully committed to network: ${query}`,
          })
        );
        store.dispatch(setLoadingStatus({ tabId, loading: false }));
        return r;
      })
      .catch((e) => {
        console.log("Write cancelled");
        console.log(e);
        store.dispatch(
          updatePendingWrite({
            query,
            status: "cancelled",
          })
        );
        store.dispatch(
          updateMessage({
            tabId,
            error: `Query failed. ${e.message as string}`,
          })
        );
        store.dispatch(setLoadingStatus({ tabId, loading: false }));
      });

    const tx = (await res) as Result;

    const abt = await (tx.meta.txn as any).wait();

    const newTableResults = await getTablelandConnection()
      .database.prepare(`SELECT * FROM ${abt.name as string} LIMIT 50;`)
      .all();

    const { columns, rows } = transformTableData(
      newTableResults.results as any
    );

    return { query, columns, tabId, error, rows };
  } else {
    try {
      res = await getTablelandConnection().database.prepare(query).all();
    } catch (e) {
      res = {
        error: `${e as string}`,
      };
    }
  }
  try {
    const { columns, rows } = transformTableData(res.results);
    store.dispatch(setLoadingStatus({ tabId, loading: false }));
    return {
      columns,
      rows,
      tabId,
      query,
      error,
    };
  } catch (e) {
    console.log(e);
  }
}

export const queryTableland = createAsyncThunk(
  "tablelandQuery/query",
  handleTablelandQuery
);

const createTableTab = function (): Tab {
  return {
    tabId: uuidv4(),
    name: "Create Table",
    type: "create",
    prefix: "",
    committing: false,
    createColumns: [
      {
        name: "id",
        type: "integer",
        notNull: false,
        primaryKey: false,
        unique: false,
        default: null,
      },
    ],
  };
};

const initId = uuidv4();

const initialState = {
  list: [
    createTableTab(),
    {
      tabId: initId,
      name: "Query 1",
      type: "query",
      columns: [],
      rows: [],
      query: ``,
      queryType: "read",
    },
  ] as Tab[],
  active: initId,
};

export function getTabIndexById(tabList: Tab[], id: any): number {
  return tabList.findIndex((item) => item.tabId === id);
}

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    setLoadingStatus(store, action) {
      const tabIndex = getTabIndexById(store.list, action.payload.tabId);
      store.list[tabIndex].loading = action.payload.loading;
    },
    updateQuery(store, action) {
      const tabIndex = getTabIndexById(store.list, action.payload.tabId);
      store.list[tabIndex].query = action.payload.query;
    },
    renameTab(store, action) {
      const tabIndex = getTabIndexById(store.list, action.payload.tabId);
      store.list[tabIndex].name = action.payload.name;
    },
    activateTab(store, action) {
      store.active = action.payload;
    },
    closeTab(store, action) {
      const tabIndex = getTabIndexById(store.list, action.payload.tabId);

      // If we're closing the active tab, set the active tab to the next tab
      if (store.active === action.payload.tabId) {
        store.active =
          store.list[tabIndex + 1]?.tabId || store.list[tabIndex - 1]?.tabId;
      }

      store.list.splice(tabIndex, 1);
    },
    updateMessage(state, action) {
      const tabIndex = getTabIndexById(state.list, action.payload.tabId);
      state.list[tabIndex].message = action.payload.message;
      state.list[tabIndex].error = action.payload.error;
    },
    newQueryTab(store, action) {
      store.list.push({
        tabId: action.payload.tabId || uuidv4(),
        name: action.payload?.title || "Query",
        type: "query",
        query: action.payload?.query || "",
        columns: [],
        rows: [],
        queryType: "",
        committing: false,
      });
      store.active = action.payload.tabId;
    },
    newCreateTableTab(store, action) {
      const newCreate = createTableTab();
      store.list.push(newCreate);
      store.active = newCreate.tabId;
    },
    startCommit(state, action) {
      const tab = getTabIndexById(state.list, action.payload.tabId);
      state.list[tab].committing = true;
    },
    cancelCommit(state, action) {
      const tab = getTabIndexById(state.list, action.payload.tabId);
      state.list[tab].committing = false;
    },
    completeCommit(state, action) {
      const tab = getTabIndexById(state.list, action.payload.tabId);

      state.list[tab].successMessage = action.payload.message;
    },
    setPrefix(state, action) {
      const tab = getTabIndexById(state.list, action.payload.tabId);
      state.list[tab].prefix = action.payload.prefix;
    },
    addColumn(state, action) {
      const tab = getTabIndexById(state.list, action.payload.tabId);

      (state.list[tab].createColumns as any).push({
        name: "",
        type: "text",
        notNull: false,
        primaryKey: false,
        unique: false,
        default: "",
      });
    },
    removeColumn(state, action) {
      const tab = getTabIndexById(state.list, action.payload.tabId);
      if (action.payload.column) {
        (state.list[tab].createColumns as any).splice(action.payload.column, 1);
      } else {
        (state.list[tab].createColumns as any).pop();
      }
    },
    updateColumnProperty(
      state,
      { payload: { columnIndex, property, value, checked, tabId } }
    ) {
      const tab = getTabIndexById(state.list, tabId);
      const newVal =
        property === "notNull" ||
        property === "primaryKey" ||
        property === "unique"
          ? checked
          : value;

      (state.list[tab].createColumns as any)[columnIndex][property] = newVal;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      queryTableland.fulfilled,
      // @ts-expect-error tabsSlice error with TablelandQueryResult | undefined
      (state, { payload: { columns, rows, query, tabId, error } }) => {
        const tabIndex = getTabIndexById(state.list, tabId);
        state.list[tabIndex] = {
          ...state.list[tabIndex],
          columns,
          rows,
          query,
          error,
        };
      }
    );
    builder.addCase(checkQueryType.fulfilled, (state, action) => {
      const tab = getTabIndexById(state.list, action.payload.tabId);
      state.list[tab].queryType = action.payload.type;
    });
    builder.addCase(queryTableland.rejected, (state, action: any) => {
      console.error(action.error);
      const tabIndex = getTabIndexById(state.list, action.meta.arg.tabId);
      state.list[tabIndex].loading = false;
      state.list[tabIndex].error =
        action.error.message && action.error.message !== "obj is undefined"
          ? `${
              action.error.message as string
            }: this may be because you are querying a network to which you aren't connected.`
          : "";
    });
  },
});

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
  setLoadingStatus,
} = tabsSlice.actions;

export default tabsSlice.reducer;
