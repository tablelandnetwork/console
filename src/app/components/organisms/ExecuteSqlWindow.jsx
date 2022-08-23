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
      console.log("This is the token", token);

      if(tablelandQuery.query!==decodeURIComponent(token)) {
        console.log("hi");
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
  
   
  return (
    <div className='execute-sql-window'>
      <CodeEditor onChange={code=>{
        dispatch(setQuery(code));
        dispatch(checkQueryType(code));
      }} code={query} />
      <ExecuteSqlActions />

      {resultSet.error && <div className="error">Error<br></br>{resultSet.error}</div>}
      {resultSetStatus==="loading" ? <Loading /> : <Table />}

    </div>    
  );
}

export default ExecuteSqlSection;
