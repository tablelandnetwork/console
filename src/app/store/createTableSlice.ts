import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type Result } from "@tableland/sdk";
import { getTablelandConnection } from "../database/connectToTableland";
import {
  startCommit,
  cancelCommit,
  completeCommit,
  updateMessage,
} from "../store/tabsSlice";
import { addPendingWrite, updatePendingWrite } from "./pendingWritesSlice";
import store from "./store";
import { refreshTables } from "./tablesSlice";

export const sendCreateQuery = createAsyncThunk(
  "/send",
  async (details: any) => {
    const { query, options, tabId } = details;

    const fullQuery = `CREATE TABLE ${options.prefix as string} (${
      query as string
    });`;
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
      completeCommit({ tabId, message: `${receipt.name as string} created.` })
    );
    // @ts-expect-error Fathom analytics is not typed
    fathom.trackGoal("2QDPIHSR", 0);

    await store.dispatch(refreshTables());
  }
);

export function columnsSummary(columns: any): string {
  const columnsArray = columns.map((column: any) => {
    let columnText = `${column.name as string} ${column.type as string}`;
    console.log("create table slice");
    console.log(column);
    if (column.notNull) {
      columnText += " NOT NULL";
    }
    if (column.primaryKey) {
      columnText += " PRIMARY KEY";
    }
    if (column.unique) {
      columnText += " UNIQUE";
    }
    if (column.default && column.type === "integer") {
      columnText += ` DEFAULT ${column.default as string}`;
    } else if (column.default) {
      columnText += ` DEFAULT '${column.default as string}'`;
    }
    return columnText;
  });
  return columnsArray.join(", ");
}

const initialState = {
  name: "untitled_table",
  committing: false,
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
      state.committing = true;
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
        // @ts-expect-error Expect empty string
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
