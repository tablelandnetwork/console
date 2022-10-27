import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedCellUpdated } from '../../store/selectedCellSlice';
import CodeEditor from './CodeEditor';

function Cell(props) {
  const { row, column } = props;
  const dispatch = useDispatch();
  const cell = useSelector(store => store.tabs.list[props.tab].rows[props.row][props.column]);
  const selectedCell = useSelector(state => state.selectedCell);
  const selectedClass = (
    row === selectedCell.row
    && column === selectedCell.column
  ) ? "selected" : "";

  let cellContents = cell;

  // If is JSON, highlight it
  if(typeof cell === "object" && cell !==null) {
    cellContents = <CodeEditor hideLineNumbers={true} code={JSON.stringify(cell)}></CodeEditor>;
  }

  return (
    <td 
      onClick={() => dispatch(selectedCellUpdated({...props}))} 
      className={selectedClass}
    >
      {cellContents}
    </td>
  )
}

export default Cell;
