import React from 'react';
import { useSelector } from 'react-redux';
import Table from '../atoms/Table';
import CellEditor from '../molecules/CellEditor';
import DatabaseList from '../molecules/DatabaseList';

// TODO: STATIC; build out table editor

function TableEditor(props) {

  let queryList = useSelector(store => store.queryList);
  let selectedCell = useSelector(store => store.selectedCell);
  let resultSet = useSelector(state => state.latestResultset);

  return (
    <div className="update-table-panel">
      <div className="update-table-editor">
        <h2>Update table Rigs_01_15</h2>
        <DatabaseList />
        <Table table={selectedCell.table} database={selectedCell.database} />
        <CellEditor />
      </div>
      <div className="txns-created">
        <h2>Txns</h2>
        <ol className="transaction-list" type="1">
          {
            queryList.map(query => {
              return <li key={query}>{query}<span className="delete">X</span></li>
            })
          }
        </ol>
        <div className="txns-created-actions">
          <button>Clear</button>
          <button className="primary-action">Commit</button>
        </div>
      </div>
    </div>
  );
}
export default TableEditor;
