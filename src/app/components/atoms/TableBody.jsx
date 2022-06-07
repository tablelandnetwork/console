import React from 'react';
import { useSelector } from 'react-redux';
import Row from './Row';

function TableBody(props) {
  let table = useSelector(state => state.databases[props.database].tables[props.table]);

  return (
    <tbody>
      {
        table.rows.map((row, rowKey) => {
          return <Row key={rowKey} {...props} row={rowKey} />
        })
      }
    </tbody>
  );
}
export default TableBody;
