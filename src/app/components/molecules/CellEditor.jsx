import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { queryAppended } from '../../store/queryListSlice';
import CodeEditor from '../atoms/CodeEditor';


function CellEditorWrapper(props) {
  const selectedCell = useSelector(state => state.selectedCell);

  return (
    <CellEditor {...props} key={`${JSON.stringify(selectedCell)}`} />
  )
}

// TODO: STATIC: Create update statements
function CellEditor(props) {
  const dispatch = useDispatch();
  const selectedCell = useSelector(state => state.selectedCell);
  
  const resultSet = useSelector(store => store.latestResultSet);
  const cell = useSelector(store => store.latestResultSet.rows?.[selectedCell.row]?.[selectedCell.column]);
  const [textAreaVal, setTextAreaVal] = useState(cell);
  
  // TODO: Kill me
  const table = {
    name: "HelloThere"
  }

  if(!cell) return null;
  return (
    <div className="cell-editor">
      
      <div className="cell-edit-box">
        <div>
          <textarea value={textAreaVal} onChange={event => {setTextAreaVal(event.target.value)}} />

        </div>
      </div>
      <div className="cell-edit-actions">
        <select>
          <option>
            Text
          </option>
          <option>
            File
          </option>
          <option>
            Image
          </option>
          <option>
            Number
          </option>
        </select>
        <button type="main" onClick={() => {
          dispatch(queryAppended(`UPDATE ${table.name} SET mycolumn = '${textAreaVal}' WHERE rowid = ${resultSet.columns[selectedCell.column]};`));
          // Roughly something like... 
        }}>
          Update
        </button>
      </div>
    </div>
  );
}
export default CellEditorWrapper;
