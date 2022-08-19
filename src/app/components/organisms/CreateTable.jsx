import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addColumn, updateColumn, updateName } from '../../store/createTableSlice';


function CreateColumn(props) {
  const dispatch = useDispatch();
  const column = useSelector(store=>store.createTable.columns[props.slot]);
  return (
    <div>

        <input 
          type="column-name" 
          placeholder='Column Name' 
          pattern='[a-zA-Z][a-zA-Z0-9]*' 
          className='form-input'
          defaultValue={column[0]}
          onChange={e=> {
            dispatch(updateColumn({
              columnIndex: props.slot,
              newColumn: [e.target.value, column[1]]
            }))
          }}
        />
        <select 
          type="Column type" 
          defaultValue={column[1]}
          onChange={e => {
            dispatch(updateColumn({
              columnIndex: props.slot,
              newColumn: [column[0], e.target.value]
            }))
          }}
          
          >
          <option value="any">Any</option>
          <option value="text">Text</option>
          <option value="integer">Integer</option>
        </select>
        <button>Delete this column</button>
      </div>

  )
}

function CreateTable(props) {
  const tableName = useSelector(store=>store.createTable.name);
  const columns = useSelector(store=>store.createTable.columns);
  const dispatch = useDispatch();

  const stringColumns = columns.map(column => {
    return column.join(" ");
  }).join(", ");

  return (
    <form onSubmit={e => {
      e.preventDefault();
      tbl.create(stringColumns, tableName);
    }}>
      <label>Table Prefix
        <input 
          placeholder='Table Prefix'
          className='form-input'
          type="text" 
          value={tableName} 
          onChange={e => {
            dispatch(updateName(e.target.value));
          }} />
      </label> 

      {columns.map((column, key) => {
        return <CreateColumn key={key} slot={key} />
      })}
      <div>
        <button onClick={e => {
          e.preventDefault();
          dispatch(addColumn());
        }}>Add Column</button>
      </div>
      <button>Create Table on Network</button>
      <button>Create Local</button>
    </form>
  );
}
export default CreateTable;
