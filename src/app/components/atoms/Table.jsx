import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

function Table() {


  return (
    <div className='table-container'>
      <table className='tabula-rasa'>           
        <TableHeader />
        <TableBody />
      </table>
    </div>
  );
}

export default Table;
