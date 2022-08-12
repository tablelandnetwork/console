import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedCellUpdated } from '../../store/selectedCell';
import { Link } from 'react-router-dom';


function TableList(props) {
  const dispatch = useDispatch();
  const database = useSelector(store => store.databases[props.database]);
  const selectedCell = useSelector(store => store.selectedCell);

  return (
    <ul className='table-list'>
      {database.tables.map((table, tableKey) => {
        const itemClass = selectedCell.database === tableKey ? "selected" : "";
        const tbl_name_parts = table.name.split("_");
        const tbl_chain = tbl_name_parts[tbl_name_parts.length - 2];
        const tbl_id = tbl_name_parts[tbl_name_parts.length - 1];
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
            <Link to={`/?table=${tbl_chain}&${tbl_id}`}>{table.name}</Link>
          </li>
        )
      })}
    </ul>
  );
}
export default TableList;
