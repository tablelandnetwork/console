import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { genericQuery } from '../../database/databaseCalls';
import { queryAppended } from '../../store/queryListSlice';
import CodeEditor from '../atoms/CodeEditor';
import Table from '../atoms/Table';

function ExecuteSqlActions(props) {
  
  const dispatch = useDispatch()
  const [db, setDb] = useState('tableland'); 
  return (
    <ul className='action-icons-bar'>
      <li>
        <button onClick={(event) => {
            try {
              event.preventDefault();
              if (!db) {
                throw(new Error("No database selected"));
              }
              genericQuery(props.query, {db});
              dispatch(queryAppended(props.query));

            } catch(e) {
              console.log("This error, lol", e);
            }

            
          }} disabled={!(props.query.length && db)}>Prepare Commit</button>
        <button onClick={(event) => {
            try {
              event.preventDefault();
              if (!db) {
                throw(new Error("No database selected"));
              }
              genericQuery(props.query, {db});
              

            } catch(e) {
              console.log("This error, lol", e);
            }

            
          }} disabled={!(props.query.length && db)}>Query</button>

      </li>
    </ul>
  );

}


function ExecuteSqlSection(props) {
  
  let resultSet = useSelector(state => state.latestResultSet);
  const [query, setQuery] = useState(resultSet?.query || "");
  
  return (
    <div className='execute-sql-window'>

      <Table />
      <CodeEditor onChange={code=>{setQuery(code)}} code={query} />
      <ExecuteSqlActions query={query} />
      {resultSet.error && <div className="error">Error<br></br>{resultSet.error}</div>}
    </div>    
  );
}
export default ExecuteSqlSection;
