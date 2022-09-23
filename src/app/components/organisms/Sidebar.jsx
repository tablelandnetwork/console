import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarMode } from '../../store/sidebarSlice';
import TableListPane from '../molecules/TableListPane';

function ActionsBar() {

  const dispatch = useDispatch();

  return (
    <ul className='actions-bar'>
      <li className='actions-bar--item active' onClick={() => {
        dispatch(setSidebarMode('default'));
      }}>
        <i className="fa-solid fa-terminal"></i>
      </li>
      <li className='actions-bar--item' onClick={() => {
        dispatch(setSidebarMode('savedTabs'));
      }}>
        <i className="fa-solid fa-list"></i>
      </li>
      <li className='actions-bar--item disabled'>
        <i className="fa-solid fa-file-code"></i>
      </li>
      <li className='actions-bar--item disabled'>
        <i className="fa-solid fa-user-lock"></i>
      </li>
      <li className='actions-bar--item disabled'>
        <i className='fa fa-plus'></i>
      </li>    

    </ul>
  );
}

function SavedTabs() {
  const saved = JSON.parse(localStorage.getItem("savedQueries"));

  return (
    <ul className='saved-queries'>
      {saved.map(query => {
        return <li>{query.name}: {query.query}</li>;
      })}
    </ul>
  );
}

function Sidebar(props) {

  const sidebarMode = useSelector(store => store.sidebar.mode);
  
  let content = null;
  switch(sidebarMode) {
    case "savedTabs":
      content = <SavedTabs />    
      break;
    default:  
      content = <TableListPane />
      break;
  }

  return (
    <div className='sidebar'>
      <ActionsBar />
      {content}
    </div>
  );
}
export default Sidebar;
