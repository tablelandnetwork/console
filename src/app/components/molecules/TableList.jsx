import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedCellUpdated } from '../../store/selectedCell';


function TableList(props) {
  const dispatch = useDispatch();
  const database = useSelector(store => store.databases[props.database]);
  const selectedCell = useSelector(store => store.selectedCell);

  return (
    <ul className='table-list'>
      {database.tables.map((table, tableKey) => {
        const itemClass = selectedCell.database === tableKey ? "selected" : "";
        return (
          <li 
            key={`${database.name}-${table.name}`} 
            onClick={() => dispatch(selectedCellUpdated({
              database: props.database,
              table: tableKey,
              row: 0,
              column: 0
            }))} 
            className={itemClass}
          >
            {table.name}
          </li>
        )
      })}
    </ul>
  );
}
export default TableList;
