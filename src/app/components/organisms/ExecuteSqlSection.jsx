import React from 'react';
import QueryPane from '../molecules/QueryPane';
import ResultSetPane from '../molecules/ResultSetPane';
import { useDispatch, useSelector } from 'react-redux';
import { closeTab, newQueryTab, activateTab, renameTab } from '../../store/tabsSlice';
import CreateTable from './CreateTable';




function TabLabel(props) {
  const dispatch = useDispatch();
  const currentTab = useSelector(store=>store.tabs.active);
  const tab = useSelector(store => store.tabs.list[props.tab]);


  function switchToTab(key) {
    dispatch(activateTab(key));
  }

  function closeThisTab(key) {
    dispatch(closeTab(key));
  }


  return (
    <li
      className={props.tab===currentTab ? "active" : "not-active"}
      onClick={() => switchToTab(props.tab)}

    >
      {tab.type === "create" ? <i className="fa-regular fa-square-plus"></i> : <i className="fa-solid fa-terminal"></i>}
      <input type="name" value={tab.name} onChange={(e) => {
        dispatch(renameTab({tab: props.tab, name: e.target.value}));
      }} /> 
      <span onClick={() => closeThisTab(props.tab)}><i className="fa-solid fa-circle-xmark"></i></span></li>
  );

}

function ExecuteSqlSection() {
   
  const tabs = useSelector(store=>store.tabs.list);
  const currentTab = useSelector(store=>store.tabs.active);
  const dispatch = useDispatch();

  function openQueryTab() {
    dispatch(newQueryTab());
  }




  return (
      <div className='tabs-pane'>
        <div>
          <ul className="tab-nav">
            {tabs.map((tab, key) => {
              return <TabLabel tab={key} key={key} />
            })}
            <li onClick={openQueryTab} ><i className="fa-solid fa-circle-plus highlight"></i></li>
          </ul>
        </div>
        {tabs.map((tab, key) => {
          const className = currentTab === key ? "open" : "closed";
          if(tab.type==="create") {
            return (
              <div key={key} className={`${className} single-tab-pane`}>
                <CreateTable />
              </div>
            );
          }
    
          return (
            <div key={key} className={`${className} single-tab-pane`}>
              <QueryPane tab={key} />

              <ResultSetPane tab={key} />
            </div>
          );
        })}
      </div>   
  );
}

export default ExecuteSqlSection;
