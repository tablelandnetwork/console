import React from 'react';
import { useState } from 'react';


function CreateColumn() {
  return (
    <div>

        <input 
          type="column-name" 
          placeholder='Column Name' 
          pattern='[a-zA-Z][a-zA-Z0-9]*' 
          className='form-input'
        />
        <select type="Column type">
          <option value="any">Any</option>
          <option value="text">Text</option>
          <option value="integer">Integer</option>
        </select>
        <button>Delete this column</button>
      </div>

  )
}

function CreateTable(props) {
  const [tableName, setTableName] = useState("");
  const [columns, setColumns] = useState([{}]);
  return (
    <form>
      <label>Table Prefix
        <input 
          placeholder='Table Prefix'
          className='form-input'
          type="text" 
          defaultValue={""} 
          value={tableName} 
          onChange={e => {
            setTableName(e.target.value);
          }} />
      </label> 

      {columns.map(column => {
        return <CreateColumn />
      })}
      <div>
        <button>Add Column</button>
      </div>
      <button>Create Table on Network</button>
      <button>Create Local</button>
    </form>
  );
}
export default CreateTable;
