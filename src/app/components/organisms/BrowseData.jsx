import React from 'react';
import TableSelector from '../molecules/TableSelector';
import Table from '../atoms/Table';
import CellEditor from '../molecules/CellEditor'; 

function BrowseData(props) {

  return (
    <>
      <TableSelector />
      <Table />
      <CellEditor />
    </>
  );
}
export default BrowseData;
