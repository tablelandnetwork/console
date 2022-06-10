import React from 'react';
import { useSelector } from 'react-redux';
import TableList from './TableList';

function DatabaseList(props) {
  const databases = useSelector(store => store.databases);
  return (
    <>
      <h2>Database List</h2>
      <ul className='database-list'>
        {databases.map((database, databaseKey) => {
          return (
            <li key={database.name}>
              <h3>{database.name}</h3>
              <TableList database={databaseKey} />
            </li>
          )
        })}
      </ul>
    </>
  );
}
export default DatabaseList;
