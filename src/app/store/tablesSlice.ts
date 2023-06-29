import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type Table } from "@tableland/sdk";
import { getTablelandConnection } from "../database/connectToTableland";
import { addMalformedTable } from "./pageStateSlice";
import store from "./store";

export const getSchema = createAsyncThunk(
  "tables/getSchema",
  async (action: any) => {
    const { tableName } = action;

    const table = await getTablelandConnection().validator.getTableById(
      tableName
    );

    const schema = table.schema;

    return {
      schema,
      tableName,
    };
  }
);

async function rateLimitedTableMetaFetch(
  tables: Array<{ chainId: number; tableId: string }>
): Promise<TableMeta[]> {
  return await new Promise((resolve, reject) => {
    let i = 0;
    const results: any[] = [];

    // WHY? Why set interval?
    // Answer: The validator rate limits requests.
    const intervalId = setInterval(() => {
      if (i === tables.length) {
        clearInterval(intervalId);
        setTimeout(() => {
          // We have to wait for the final interval to complete.
          resolve(results);
        }, 300);

        return;
      }
      const ii = i;
      // perform the call with the current element of the array
      const call = async (): Promise<Table> => {
        return await getTablelandConnection().validator.getTableById(
          tables[ii]
        );
      };

      call()
        .then((result) => {
          results.push(result);
        })
        .catch((error) => {
          console.error(error);
          store.dispatch(addMalformedTable(tables[ii].tableId));
        });
      i++;
    }, 100);
  });
}

export const refreshTables = createAsyncThunk(
  "tables/refreshTables",
  async (action) => {
    const tables = await (
      getTablelandConnection().registry as any
    ).listTables();

    const gotem = await rateLimitedTableMetaFetch(tables);
    return gotem;
  }
);

interface TableMeta {
  name: string;
  schema: {
    constraints: string[];
    columns: Array<{ name: string; type: string; constraints: string[] }>;
  };
}

interface Tables {
  list: TableMeta[];
  refreshing: boolean;
}

const initialState: Tables = {
  list: [],
  refreshing: false,
};

const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(refreshTables.pending, (state, action) => {
      state.refreshing = true;
    });
    builder.addCase(refreshTables.fulfilled, (state, action) => {
      state.refreshing = false;
      state.list = action.payload;
    });
    builder.addCase(refreshTables.rejected, (state, action) => {
      state.refreshing = false;
    });
  },
});
// eslint-disable-next-line no-empty-pattern
export const {} = tablesSlice.actions;
export default tablesSlice.reducer;
