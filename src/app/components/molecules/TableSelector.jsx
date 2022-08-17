import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { genericQuery } from '../../database/databaseCalls';

function TableSelector(props) {
  
  const databases = useSelector(store => store.databases);
  const [db, setDb] = useState('tableland'); 

  return (
    <select className="case-matters" onChange={e => {
      let [db, table] = e.target.value.split(".");
      genericQuery(`SELECT * FROM ${table};`, {db, editable: true});
    }}>
      {databases.map(database => {
        return (
          <optgroup label={database.name} key={database.name}>
            {
              database.tables.map(table => {
                return <option key={table.name} value={`${database.name}.${table.name}`}>{table.name}</option>
              })
            }
          </optgroup>
        );
      })}            
    </select>
  );
}
export default TableSelector;
