import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function TableListTable() {
  const tables = useSelector(store => store.tables.myTables);

  return (
    <div className='table-container'>
      <table className='tabula-rasa'>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Structure
            </th>
            <th>
              Owned
            </th>
            <th>
              Starred
            </th>          
          </tr>
        </thead>
        <tbody>
          {tables.map(table => {
            return (
              <tr key={table.name}>
                <td>
                  <Link to={`/browse?table=${table.name}`}>{table.name}</Link>
                </td>
                <td>{table.structure}</td>
                <td>{table.owned ? <i className="fa-solid fa-check"></i> : null}</td>
                <td></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}


function TablesList(props) {
  const myTables = useSelector(store => store.tables.myTables);
  const starredTables = useSelector(store => store.tables.starredTables);

  return (
    <div className='tables-list'>
      <div className='tables-list--header'>
        <h2>Tables of interest</h2>
      </div>      
      <TableListTable />

    </div>
  );
}
export default TablesList;
