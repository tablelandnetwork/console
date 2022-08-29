import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { modeSet } from "../../store/modeSlice";
import { setQuery } from "../../store/querySlice";
import { queryTableland } from "../../store/resultSetSlice";

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

  function copyQueryText() {
    navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/execute?query=${encodeURIComponent(query)}`)
  }

  function sendQuery(event) {
      event.preventDefault();
      searchParams.set("query", query);
      setSearchParams(searchParams);
      dispatch(queryTableland({query: query}));
  }

  const mode = useSelector(store => store.mode);

  if(mode!=="tablelandQuery") {
    dispatch(modeSet("tablelandQuery"))
  }
  
  return (
    <ul className='action-icons-bar'>
      <li>
        <button onClick={copyQueryText}>Copy link to Query <i className="fa-solid fa-clipboard"></i></button>
        <button onClick={sendQuery} disabled={!(query.length) || queryType==='invalid'}>{ queryType==='write' ? 'Commit' : 'Query' }</button>
      </li>
    </ul>
  );

}


export default ExecuteSqlActions;
