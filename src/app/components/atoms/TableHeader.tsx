import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getTabIndexById } from '../../store/tabsSlice';

function HeaderRow(props) {

  const columns = useSelector((store: RootState) => store.tabs.list[getTabIndexById(store.tabs.list, props.tabId)].columns);

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
