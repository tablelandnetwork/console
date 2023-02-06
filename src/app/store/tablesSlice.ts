import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getTablelandConnection } from '../database/connectToTableland';

export const getSchema = createAsyncThunk('tables/getSchema', async (action: any) => {

  const { tableName } = action;

  const table = await getTablelandConnection().validator.getTableById(tableName);

  const schema = table.schema;

  return {
    schema,
    tableName
  }
});

function rateLimitedTableMetaFetch(tables: Array<{chainId: number, tableId: string}>): Promise<Array<TableMeta>> {
  return new Promise((resolve, reject) => {
      let i = 0;
      const results: Array<any> = [];

      // WHY? Why set interval?
      // Answer: The validator rate limits requests.
      const intervalId = setInterval(() => {
          if (i === tables.length) {
              clearInterval(intervalId);
              setTimeout(() => {
                // We have to wait for the final interval to complete.
                resolve(results);
              }, 300)
              
              return;
          }
          const ii = i;
          // perform the call with the current element of the array
          const call = async () => { 
              return getTablelandConnection().validator.getTableById(tables[ii]);

          }

          call()
              .then(result => {                
                  results.push(result);
              })
              .catch(error => {
                console.error(error.message);
                console.error(`Table ${tables[ii].tableId} does not exist. The table's Create statement may have been malformed.`);
              });
          i++;
      }, 100);
  });
}


export const refreshTables = createAsyncThunk('tables/refreshTables', async (action) => {

  const tables = await getTablelandConnection().registry.listTables();

  const gotem = await rateLimitedTableMetaFetch(tables);
  return gotem;

});



interface TableMeta {
  name: string;
  schema: {
    constraints: Array<string>;
    columns: Array<{name: string, type: string, constraints: Array<string>}>;
  }
}

interface Tables {
  list: Array<TableMeta>;
  refreshing: boolean;

}

const initialState: Tables = {
  list: [], 
  refreshing: false
}

const tablesSlice = createSlice({
  name: 'tables',
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
  }
})
export const {  } = tablesSlice.actions
export default tablesSlice.reducer
