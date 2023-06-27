import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTablelandConnection } from "../database/connectToTableland";
import { addPendingWrite, updatePendingWrite } from "./pendingWritesSlice";
import store from "./store";
import {
  startCommit,
  cancelCommit,
  completeCommit,
  updateMessage,
} from "../store/tabsSlice";
import { refreshTables } from "./tablesSlice";
import { Result } from "@tableland/sdk";

export const sendCreateQuery = createAsyncThunk(
  "/send",
  async (details: any) => {
    const { query, options, tabId } = details;

    const fullQuery = `CREATE TABLE ${options.prefix} (${query});`;
    store.dispatch(startCommit({ tabId }));
    store.dispatch(
      addPendingWrite({
        query: fullQuery,
        status: "pending-wallet",
      })
    );
    const tx = getTablelandConnection()
      .database.prepare(fullQuery)
      .all()
      .catch((e) => {
        console.log("Create failed");
        console.log(e);
        store.dispatch(
          updatePendingWrite({
            query: fullQuery,
            status: "cancelled",
          })
        );
        store.dispatch(cancelCommit({ tabId }));
        store.dispatch(updateMessage({ tabId, error: e.message }));
      });
    store.dispatch(
      updatePendingWrite({
        query: fullQuery,
        status: "pending-network",
      })
    );
    const txResult = (await tx) as Result<unknown>;
    const receipt = await (txResult.meta.txn as any).wait();

    store.dispatch(
      updatePendingWrite({
        query: fullQuery,
        status: "complete",
        hash: (txResult.meta.txn as any).transactionHash,
        chain: (txResult.meta.txn as any).chainId,
        tableName: await receipt.name,
      })
    );

    store.dispatch(
      completeCommit({ tabId, message: `${receipt.name} created.` })
    );
    // @ts-ignore
    fathom.trackGoal("2QDPIHSR", 0);

    store.dispatch(refreshTables());
  }
);

export function columnsSummary(columns) {
  let columnsArray = columns.map((column) => {
    let columnText = `${column.name} ${column.type}`;
    if (column["notNull"]) {
      columnText += " NOT NULL";
    }
    if (column["primaryKey"]) {
      columnText += " PRIMARY KEY";
    }
    if (column["unique"]) {
      columnText += " UNIQUE";
    }
    if (column["default"] && column.type === "integer") {
      columnText += ` DEFAULT ${column["default"]}`;
    } else if (column["default"]) {
      columnText += ` DEFAULT '${column["default"]}'`;
    }
    return columnText;
  });
  return columnsArray.join(", ");
}

const initialState = {
  name: "untitled_table",
  commiting: false,
  columns: [
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

const createTableSlice = createSlice({
  name: "createTable",
  initialState,
  reducers: {
    startCommit(state, action) {
      state.commiting = true;
    },
    setPrefix(state, action) {
      state.name = action.payload;
    },
    addColumn(state, action) {
      state.columns.push({
        name: "",
        type: "text",
        notNull: false,
        primaryKey: false,
        unique: false,
        // @ts-ignore
        default: "",
      });
    },
    removeColumn(state, action) {
      state.columns.pop();
    },
    updateColumnProperty(state, action) {
      const { columnIndex, property, value, checked } = action.payload;

      let newVal;
      switch (property) {
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
    },
  },
});

export const { addColumn, removeColumn, setPrefix, updateColumnProperty } =
  createTableSlice.actions;
export default createTableSlice.reducer;
