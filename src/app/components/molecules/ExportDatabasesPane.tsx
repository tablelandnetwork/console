import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function ExportDatabases(props) {
  const tables = useSelector((store: RootState) => store.tables.myTables);

  return (
    <div className='export-database'>
      {tables.map(table => {
        return (
          <div>
            <input type="checkbox" />
            {table.name}
          </div>
        )
      })}
      <button>Export Tables to SQLite Database</button>
    </div>
  );
}
export default ExportDatabases;
