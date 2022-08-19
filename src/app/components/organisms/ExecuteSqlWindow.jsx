import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { query } from '../../database/databaseCalls';
import { modeSet } from '../../store/modeSlice';
import { setQuery } from '../../store/querySlice';
import CodeEditor from '../atoms/CodeEditor';
import Table from '../atoms/Table';

function ExecuteSqlActions(props) {
  

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams.has("query")) {
      const token = searchParams.get("query");
      if (token) {
        searchParams.delete("query");
        console.log("setting params:", { searchParams: searchParams.toString() });
        console.dir(searchParams.toString());
        dispatch(setQuery(token));
        setSearchParams(searchParams);
      }
    }
  }, []);


  const mode = useSelector(store => store.mode);
  if(mode!=="latestResultSet") {
    dispatch(modeSet("latestResultSet"))
  }
  const [db, setDb] = useState('tableland'); 
  return (
    <ul className='action-icons-bar'>
      <li>
        <button onClick={() => {
          navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/execute?query=${encodeURIComponent(props.query)}`)
        }}>Copy link to Query <i className="fa-solid fa-clipboard"></i></button>
        <button onClick={(event) => {
            try {
              event.preventDefault();
              if (!db) {
                throw(new Error("No database selected"));
              }
              query(props.query, {db});
              

            } catch(e) {
              console.log("This error, lol", e);
            }

            
          }} disabled={!(props.query.length && db)}>Query</button>
      </li>
    </ul>
  );

}


function ExecuteSqlSection(props) {
  
  let resultSet = useSelector(store => store.latestResultSet);
  const query = useSelector(store => store.query);
  const dispatch = useDispatch()
  
   
  return (
    <div className='execute-sql-window'>
      <CodeEditor onChange={code=>{dispatch(setQuery(code))}} code={query} />
      <ExecuteSqlActions query={query} />

      {resultSet.error && <div className="error">Error<br></br>{resultSet.error}</div>}
      <Table />

    </div>    
  );
}
export default ExecuteSqlSection;
