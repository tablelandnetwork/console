import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { modeSet } from '../../store/modeSlice';
import { setQuery, checkQueryType } from '../../store/querySlice';
import CodeEditor from '../atoms/CodeEditor';
import Table from '../atoms/Table';
import { queryTableland } from '../../store/resultSetSlice';
import Loading from '../atoms/Loading';

function ExecuteSqlActions() {
  

  const [searchParams, setSearchParams] = useSearchParams();
  const tablelandQuery = useSelector(store => store.tablelandQuery.query);
  const query = useSelector(store => store.query.value);
  const queryType = useSelector(store => store.query.type);
  const dispatch = useDispatch();

  useEffect(() => {

    if (searchParams.has("query")) {
      const token = searchParams.get("query");

      if(tablelandQuery.query!==decodeURIComponent(token)) {
        dispatch(queryTableland({query: token}));
      }
      if (token) {
        dispatch(setQuery(token));
        setSearchParams(searchParams);
      
      } 
    }
  }, []);


  const mode = useSelector(store => store.mode);
  if(mode!=="tablelandQuery") {
    dispatch(modeSet("tablelandQuery"))
  }
  return (
    <ul className='action-icons-bar'>
      <li>
        <button onClick={() => {
          navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/execute?query=${encodeURIComponent(query)}`)
        }}>Copy link to Query <i className="fa-solid fa-clipboard"></i></button>
        <button onClick={(event) => {
            try {
              event.preventDefault();
              searchParams.set("query", query);
              setSearchParams(searchParams);
              dispatch(queryTableland({query: query}));              

            } catch(e) {
              console.log("This error, lol", e);
            }

            
          }} disabled={!(query.length) || queryType==='invalid'}>{ queryType==='write' ? 'Commit' : 'Query' }</button>
      </li>
    </ul>
  );

}


function ExecuteSqlSection(props) {
  
  let resultSet = useSelector(store => store.tablelandQuery);
  const query = useSelector(store => store.query.value);
  const resultSetStatus = useSelector(store => store.tablelandQuery.status);
  const dispatch = useDispatch();
  const tables = useSelector(store => store.tables.myTables);
  
   
  return (
    <div className='execute-sql-window'>

      <CodeEditor onChange={code=>{
        dispatch(setQuery(code));
        dispatch(checkQueryType(code));
      }} code={query} />
      <ul className='tables-to-add'>
        <li><strong>Tables</strong><i className="fa-solid fa-arrow-rotate-right"></i></li>
        {
          tables.map(table => {
            return (
              <li>
                {table.name}  
                <span className='table-insert-select' onClick={() => {
                  let q = `SELECT * FROM ${table.name} LIMIT 50;`;
                  dispatch(setQuery(q));
                  dispatch(checkQueryType(q));
                  dispatch(queryTableland({query:q}))
                }}>
                  SELECT
                </span>
                <i className="fa-regular fa-circle-right" onClick={e => {
                  dispatch(setQuery(query + table.name));
                  dispatch(checkQueryType(query + table.name));
                  document.getElementById("codeEditor").focus();
                }}></i>
              </li>
            )
          })
        }
      </ul>

      <ExecuteSqlActions />

      {resultSet.error && <div className="error">Error<br></br>{resultSet.error}</div>}
      <div className='table-results'>
        {resultSet.query === "" ? "Results will load here" : null}
        {resultSetStatus==="loading" ? <Loading /> : <Table />}
      </div>
      

    </div>    
  );
}

export default ExecuteSqlSection;
