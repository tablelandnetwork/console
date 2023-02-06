import React from 'react';
import { useSelector } from 'react-redux';
import Row from './Row';
import { RootState } from '../../store/store';
import { getTabIndexById } from '../../store/tabsSlice';

function TableBody(props) {
  const rows = useSelector((store: RootState) => store.tabs.list[getTabIndexById(store.tabs.list, props.tabId)].rows);

  if (!rows) return null;
  
  return (
    <tbody>
      {
        rows.map((row, rowKey) => {
          return (
            <Row 
              tabId={props.tabId}
              key={rowKey} 
              {...props} 
              row={rowKey} 
            />
          );
        })
      }
    </tbody>
  );
}
export default TableBody;
