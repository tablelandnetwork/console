import React from 'react';
import { useSelector } from 'react-redux';
import TableList from './TableList';

function DatabaseList(props) {
  const databases = useSelector(store => store.databases);
  return (
    <ul>
      {databases.map((database, databaseKey) => {
        return (
          <li key={database.name}>{database.name}
            <TableList database={databaseKey} />
          </li>
        )
      })}
    </ul>
  );
}
export default DatabaseList;
