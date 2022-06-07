import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

function Table(props) {
  
  return (
    <table className='tabula-rasa'>           
      <TableHeader database={props.database} table={props.table} />
      <TableBody database={props.database} table={props.table} />
    </table>
  );
}

export default Table;
