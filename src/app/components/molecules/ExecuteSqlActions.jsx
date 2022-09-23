import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { queryTableland } from "../../store/tabsSlice";

function ExecuteSqlActions(props) {

  const { tab } = props;
  const tabContent = useSelector(store => store.tabs.list[tab]);
  const query = useSelector(store => store.tabs.list[tab].query);
  const queryType = useSelector(store => store.tabs.list[tab].queryType);
  const dispatch = useDispatch();


  function copyQueryText() {
    navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/execute?query=${encodeURIComponent(query)}`)
  }

  function sendQuery(event) {
      event.preventDefault();
      dispatch(queryTableland({query: query, tab: tab}));
  }

  
  return (
    <ul className='action-icons-bar'>
      <li>
        <button onClick={() => {
          let savedQueries = JSON.parse(localStorage.getItem("savedQueries")) ;
          savedQueries = Array.isArray(savedQueries) ? savedQueries : [];
          savedQueries.push({
            query: query,
            name: tabContent.name
          });
          localStorage.setItem("savedQueries", JSON.stringify(savedQueries));
        }}>Save</button> 
        <button onClick={sendQuery} disabled={!(query.length) || queryType==='invalid'}>{ queryType==='write' ? 'Commit' : 'Query' }</button>
      </li>
    </ul>
  );

}


export default ExecuteSqlActions;
