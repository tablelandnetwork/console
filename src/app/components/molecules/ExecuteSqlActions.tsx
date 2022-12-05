import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { queryTableland } from "../../store/tabsSlice";
import { RootState } from '../../store/store';
import { Flags } from 'react-feature-flags';

// TODO: Rename

function ExecuteSqlActions(props) {

  const { tab } = props;
  const tabContent = useSelector((store: RootState) => store.tabs.list[tab]);
  const query = useSelector((store: RootState) => store.tabs.list[tab].query);
  const queryType = useSelector((store: RootState) => store.tabs.list[tab].queryType);
  const dispatch = useDispatch();


  function copyQueryText() {
    navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/execute?query=${encodeURIComponent(query)}`)
  }

  function sendQuery(event) {
      event.preventDefault();
      // @ts-ignore
      dispatch(queryTableland({query: query, tab: tab}));
  }

  
  return (
    <ul className='action-icons-bar'>
      <li>
        <Flags authorizedFlags={['savedQueries']}>
          <button className="button-default" onClick={() => {
            let savedQueries = JSON.parse(localStorage.getItem("savedQueries")) ;
            savedQueries = Array.isArray(savedQueries) ? savedQueries : [];
            savedQueries.push({
              query: query,
              name: tabContent.name
            });
            localStorage.setItem("savedQueries", JSON.stringify(savedQueries));
          }}>Save</button> 
        </Flags>
        <button className="button-default" onClick={sendQuery} disabled={!(query.length) || queryType==='invalid'}>{ queryType==='write' ? 'Commit' : 'Query' }</button>
      </li>
    </ul>
  );

}


export default ExecuteSqlActions;
