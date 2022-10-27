import React from 'react';
import { useSelector } from 'react-redux';
import Cell from './Cell';

function Row(props) {

  const row = useSelector(store => store.tabs.list[props.tab].rows[props.row]);

  return (
    <tr>
      {
        row.map((column, columnKey) => {
          return (
            <Cell 
              key={columnKey} 
              tab={props.tab} 
              row={props.row} 
              column={columnKey} 
            />);
        }) 
      }
    </tr>
  );
}

export default Row;
