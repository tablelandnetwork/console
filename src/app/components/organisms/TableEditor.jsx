import React from 'react';
import { Link } from 'react-router-dom';
import EditableResultSet from '../atoms/EditableTable';

import CellEditor from '../molecules/CellEditor';
import DatabaseList from '../molecules/DatabaseList';


function TableEditor() {
  

  return (
    // <div className="update-table-panel">
    //   <div className="update-table-editor">
      <DatabaseList />

        // <EditableResultSet />
        
        // <CellEditor />

    //   </div>

    // </div>
  );
}
export default TableEditor;
