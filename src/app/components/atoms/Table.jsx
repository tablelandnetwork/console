import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { Rnd } from "react-rnd";


function Table(props) {


  return (
    <Rnd
      bounds="parent"
      axis="x"
      disableDragging={true}
    >
      <table className='tabula-rasa'>           
        <TableHeader />
        <TableBody />
      </table>
    </Rnd>
  );
}

export default Table;
