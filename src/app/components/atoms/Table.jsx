import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function Table(props) {

  
  
  const resultSet = useSelector(store => store.latestResultSet);
  const [query, setQuery] = useState(resultSet.query);


  if (!resultSet) return null;

  return (
    <>
    <form>
      <textarea onChange={e=>{setQuery(e.target.value)}} defaultValue={query}></textarea>
      <button onClick={(e) => {
        e.preventDefault();
        console.log(query);
      }}>Send query</button>
    </form>
    
    <table className='tabula-rasa'>           
      <TableHeader />
      <TableBody />
    </table>
    </>
  );
}

export default Table;
