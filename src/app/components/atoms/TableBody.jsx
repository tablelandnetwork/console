import React from 'react';
import { useSelector } from 'react-redux';
import Row from './Row';

function TableBody(props) {
  const rows = useSelector(store => store[store.mode].rows);

  if (!rows) return null;
  
  return (
    <tbody>
      {
        rows.map((row, rowKey) => {
          return (
            <Row 
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
