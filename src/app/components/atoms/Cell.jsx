import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedCellUpdated } from '../../store/selectedCell';

function Cell(props) {
  const dispatch = useDispatch();
  const cell = useSelector(state => state.databases[props.database].tables[props.table].rows[props.row][props.column]);
  const selectedCell = useSelector(state => state.selectedCell);
  const selectedClass = (
    props.table === selectedCell.table
    && props.row === selectedCell.row
    && props.column === selectedCell.column
  ) ? "selected" : "";

  return (
    <td onClick={() => dispatch(selectedCellUpdated({...props}))} className={selectedClass}>{cell}</td>
  )
}

export default Cell;
