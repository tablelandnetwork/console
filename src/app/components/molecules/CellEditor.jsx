import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';


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
  const cell = useSelector(store => store.latestResultSet.rows[selectedCell.row][selectedCell.column]);
  const [textAreaVal, setTextAreaVal] = useState(cell);
  
  if(!cell) return null;
  return (
    <div className="cell-editor">
      <div className="cell-edit-box">
        <textarea value={textAreaVal} onChange={(e)=>{setTextAreaVal(e.target.value)}}></textarea>
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
          // Roughly something like... 
          console.log(`UPDATE ${table.name} SET ${table.columns[selectedCell.column]} = '${textAreaVal}' WHERE rowid = ${row[0]};`)
        }}>
          Update
        </button>
      </div>
    </div>
  );
}
export default CellEditorWrapper;
