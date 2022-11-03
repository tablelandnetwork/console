import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

function Table(props) {

  return (
    <div className='table-container'>
      <table className='tabula-rasa'>           
        <TableHeader tab={props.tab} />
        <TableBody tab={props.tab} />
      </table>
    </div>
  );
}

export default Table;
