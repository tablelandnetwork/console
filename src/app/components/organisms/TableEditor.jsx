import React from 'react';
import { useSelector } from 'react-redux';
import CodeEditor from '../atoms/CodeEditor';
import EditableResultSet from '../atoms/EditableTable';
import Table from '../atoms/Table';
import CellEditor from '../molecules/CellEditor';
import DatabaseList from '../molecules/DatabaseList';

import { highlight, languages } from "prismjs/components/prism-core";
// TODO: STATIC; build out table editor

function TableEditor(props) {

  let queryList = useSelector(store => store.queryList);
  let selectedCell = useSelector(store => store.selectedCell);
  let resultSet = useSelector(state => state.latestResultset);

  return (
    <div className="update-table-panel">
      <div className="update-table-editor">
        <EditableResultSet />
        
        <CellEditor />
        <div>
        <Table />
        </div>
      </div>
      <div className="staged-writes">
        <h2>Txns</h2>
        <ol className="staged-writes--list" type="1">
          {
            queryList.map(query => {
              return <li key={query}><span dangerouslySetInnerHTML={{__html: highlight(query, languages.sql)}}></span><span className="delete">X</span></li>
            })
          }
        </ol>
        <div className="staged-writes--actions">
          <button className='subtle'>Clear</button>
          <button onClick={async e=>
            console.log(await tbl.write(queryList.join(" ")))
          }>Commit to network</button>
        </div>
      </div>
    </div>
  );
}
export default TableEditor;
