import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarMode } from '../../store/sidebarSlice';
import TableListPane from '../molecules/TableListPane';
import { Flags } from 'react-feature-flags';
import { setFlag } from '../../store/flagSlice';
import { RootState } from '../../store/store';

function ActionsBar() {

  const dispatch = useDispatch();
  const activeSidebarItem = useSelector((store: RootState) => store.sidebar.mode);

  function active(tab) {
    if (tab===activeSidebarItem) return 'active';
  }

  return (
    <ul className='actions-bar'>
      <li className={`actions-bar--item ${active('default')}`} onClick={() => {
        dispatch(setSidebarMode('default'));
      }}>
        <i className="fa-solid fa-terminal"></i>
      </li>
      <Flags authorizedFlags={['toggleFlags']}>
        <li className={`actions-bar--item ${active('flags')}`} onClick={() => {
          dispatch(setSidebarMode('flags'));
        }}>
          <i className="fa-solid fa-flag"></i>
        </li>
      </Flags>
      <Flags authorizedFlags={['savedQueries']}>
        <li className={`actions-bar--item ${active('savedTabs')}`} onClick={() => {
          dispatch(setSidebarMode('savedTabs'));
        }}>
          <i className="fa-solid fa-list"></i>
        </li>
      </Flags>
      <Flags authorizedFlags={['prefabQueries']}>
        <li className='actions-bar--item disabled'>
          <i className="fa-solid fa-file-code"></i>
        </li>
      </Flags>
      <Flags authorizedFlags={['accessControl']}>
        <li className='actions-bar--item disabled'>
          <i className="fa-solid fa-user-lock"></i>
        </li>
      </Flags>
      <Flags authorizedFlags={['networkFocus']}>
        <li className='actions-bar--item disabled'>
          <i className='fa fa-plus'></i>
        </li>    
      </Flags>
    </ul>
  );
}

function SavedTabs() {
  let saved = JSON.parse(localStorage.getItem("savedQueries"));
  saved = Array.isArray(saved) ? saved : []; 

  return (
    <ul className='saved-queries'>
      {saved.map(query => {
        return <li>{query.name}: {query.query}</li>;
      })}
    </ul>
  );
}

function FlagsToggler() {
  const flags = useSelector((store: RootState)=> store.flags);
  const dispatch = useDispatch();
  return (
    <ul className='flags-list'>
      {
        flags.map(flag => {
          return (
            <li onClick={() => {
              dispatch(setFlag({name: flag.name, isActive: !flag.isActive}));
            }}>{flag.name} <input type="checkbox" checked={flag.isActive} /></li>
          );
        })
      }
      <li>
        <button onClick={() => {
          flags.forEach(flag => {
            dispatch(setFlag({name: flag.name, isActive: false}));
          });
        }}>Disable all flags</button>
      </li>
      <li>
        (Page must be refreshed for flag updates to apply.)
      </li>
    </ul>
  );
}

function Sidebar(props) {

  const sidebarMode = useSelector((store: RootState) => store.sidebar.mode);
  
  let content = null;
  switch(sidebarMode) {
    case "savedTabs":
      content = <SavedTabs />    
      break;
    case "flags":
      content = <FlagsToggler />
      break;
    default:  
      content = <TableListPane />
      break;
  }

  return (
    <div className='sidebar'>
      <Flags authorizedFlags={['actionsBar']}>
        <ActionsBar />
      </Flags>
      {content}
    </div>
  );
}
export default Sidebar;
