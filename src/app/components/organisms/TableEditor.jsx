import React from 'react';
import { Link } from 'react-router-dom';
import EditableResultSet from '../atoms/EditableTable';
import Table from '../atoms/Table';
import CellEditor from '../molecules/CellEditor';
import DatabaseList from '../molecules/DatabaseList';
import StagedWritesWindow from '../molecules/StagedWritesWindow';

function TableEditor() {


  return (
    <div className="update-table-panel">
      <div className="update-table-editor">
      <DatabaseList />
      <Link class="button" to="/table-design">Create Table</Link>

        <EditableResultSet />
        
        <CellEditor />
        <div>
        <Table />
        </div>
      </div>
      <StagedWritesWindow />
    </div>
  );
}
export default TableEditor;
