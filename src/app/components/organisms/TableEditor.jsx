import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EditableResultSet from '../atoms/EditableTable';
import Table from '../atoms/Table';
import CellEditor from '../molecules/CellEditor';
import DatabaseList from '../molecules/DatabaseList';

import { highlight, languages } from "prismjs/components/prism-core";
import { clearStaged } from '../../store/queryListSlice';

function TableEditor() {
  const dispatch = useDispatch();
  const queryList = useSelector(store => store.queryList);

  return (
    <div className="update-table-panel">
      <div className="update-table-editor">
      <Link class="button" to="/table-design">Create Table</Link>
        <DatabaseList />
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
          <button className='subtle' onClick={ () => dispatch(clearStaged())}>Clear</button>
          <button onClick={async e=>
            console.log(await tbl.write(queryList.join(" ")))
          }>Commit to network</button>
        </div>
      </div>
    </div>
  );
}
export default TableEditor;
