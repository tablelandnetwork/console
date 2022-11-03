import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function HeaderRow(props) {

  const columns = useSelector((store: RootState) => store.tabs.list[props.tab].columns);

  if (!columns) return null;

  return (
    <thead>
      <tr>      
          {columns.map((column, columnKey) => {
            return (
              <th key={column.name}>
                {column.name}
              </th>
            )
          })}
      </tr>
    </thead>
  );
}
export default HeaderRow;
