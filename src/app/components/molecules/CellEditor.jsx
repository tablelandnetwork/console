import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

// TODO: STATIC: Hook this up
function CellEditor(props) {
  const dispatch = useDispatch();
  const selectedCell = useSelector(state => state.selectedCell);;
  const cell = useSelector(state => state.databases[selectedCell.database].tables[selectedCell.table].rows[selectedCell.row][selectedCell.column]);

  return (
    <div className="cell-editor">
      <div className="cell-edit-box">
        <textarea value={cell} onChange={()=>{}}></textarea>
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
        <button type="main">
          Update
        </button>
      </div>
    </div>
  );
}
export default CellEditor;
