import React from 'react';
import QueryPane from '../molecules/QueryPane';
import TableListPane from '../molecules/TableListPane';
import ResultSetPane from '../molecules/ResultSetPane';

function ExecuteSqlSection() {
   
  return (
    <div className='execute-sql-window'>
      <QueryPane />
      <TableListPane />
      <ResultSetPane />
    </div>    
  );
}

export default ExecuteSqlSection;
