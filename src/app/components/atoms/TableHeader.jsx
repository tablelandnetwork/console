import React from 'react';
import { useSelector } from 'react-redux';

function HeaderRow(props) {
  let columns = useSelector(state => state.databases[props.database].tables[props.table].columns);
  return (
    <thead>
      <tr>      
          {columns.map((column, columnKey) => {
            return (
              <th key={column}>
                {column}
              </th>
            )

          })}
      </tr>
    </thead>
  );
}
export default HeaderRow;
