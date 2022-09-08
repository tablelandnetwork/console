import React from 'react';
import QueryPane from '../molecules/QueryPane';
import ResultSetPane from '../molecules/ResultSetPane';
import { useDispatch, useSelector } from 'react-redux';
import { closeTab, newCreateTableTab, newQueryTab, activateTab } from '../../store/tabsSlice';
import CreateTable from './CreateTable';

function ExecuteSqlSection() {
   
  const tabs = useSelector(store=>store.tabs.list);
  const currentTab = useSelector(store=>store.tabs.active);
  const dispatch = useDispatch();

  function openQueryTab() {
    dispatch(newQueryTab());
  }

  function closeThisTab(key) {
    dispatch(closeTab(key));
  }

  function switchToTab(key) {
    dispatch(activateTab(key));
  }

  return (
      <div className='tabs-pane'>
        <div>
          <ul class="tab-nav">
            {tabs.map((tab, key) => {

              return (
                <li
                  className={key===currentTab ? "active" : "not-active"}
                  onClick={() => switchToTab(key)}
                >
                  {tab.type === "create" ? <i className="fa-regular fa-square-plus"></i> : <i className="fa-solid fa-code"></i>}
                  {tab.name} 
                  <span onClick={() => closeThisTab(key)}><i className="fa-solid fa-circle-xmark"></i></span></li>
              );
            })}
            <li onClick={openQueryTab} ><i className="fa-solid fa-circle-plus highlight"></i></li>
          </ul>
        </div>
        {tabs.map((tab, key) => {
          const className = currentTab === key ? "open" : "closed";
          if(tab.type==="create") {
            return (
              <div className={`${className} single-tab-pane`}>
                <CreateTable />
              </div>
            );
          }
          console.log(key);
          return (
            <div className={`${className} single-tab-pane`}>
              <QueryPane tab={key} />

              <ResultSetPane tab={key} />
            </div>
          );
        })}
      </div>   
  );
}

export default ExecuteSqlSection;
