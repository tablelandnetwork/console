import React from 'react';
import { useSelector } from 'react-redux';
import Cell from './Cell';

function Row(props) {

  const row = useSelector(store => store[store.mode].rows[props.row]);

  return (
    <tr>
      {
        row.map((column, columnKey) => {
          return (
            <Cell 
              key={columnKey} 
              table={props.table} 
              row={props.row} 
              column={columnKey} 
              database={props.database} 
            />);
        }) 
      }
    </tr>
  );
}

export default Row;
