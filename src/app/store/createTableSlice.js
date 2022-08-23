import { createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer';

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

const initialState = {name: "", columns: [{name: "id", type: "integer", notNull: false, primaryKey: false, unique: false}]};

const createTableSlice = createSlice({
  name: 'createTable',
  initialState,
  reducers: {
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

export const { addColumn, removeColumn, updateColumnProperty } = createTableSlice.actions
export default createTableSlice.reducer
