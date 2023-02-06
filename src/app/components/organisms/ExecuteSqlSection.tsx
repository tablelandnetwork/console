import React, { useRef, useEffect } from 'react';
import QueryPane from '../molecules/QueryPane';
import ResultSetPane from '../molecules/ResultSetPane';
import { useDispatch, useSelector } from 'react-redux';
import { closeTab, newQueryTab, activateTab, renameTab } from '../../store/tabsSlice';
import CreateTable from './CreateTable';
import { RootState } from '../../store/store';

// TODO: Seperate files for components

function TabLabel(props) {
  const dispatch = useDispatch();
  const currentTab = useSelector((store: RootState)=>store.tabs.active);
  const tab = useSelector((store: RootState) => store.tabs.list[props.tab]);


  function switchToTab(key) {
    dispatch(activateTab(key));
  }

  function closeThisTab(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(closeTab(props.tab));
  }



  const ref = useRef();

  
  useEffect(() => {
    if(ref && ref.current)
    (ref?.current as any).scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'center' });
  }, []);


  return (
    <li
      className={props.tab===currentTab ? "active" : "not-active"}
      onClick={() => switchToTab(props.tab)}
      ref={ref}
    >
      {tab.type === "create" ? <i className="fa-regular fa-square-plus"></i> : <i className="fa-solid fa-terminal"></i>}
      <input type="name" style={{"pointerEvents": props.tab!==currentTab ? "none" : "initial"}}  value={tab.name} onChange={(e) => {
        dispatch(renameTab({tab: props.tab, name: e.target.value}));
      }} /> 
      <span onClick={closeThisTab}><i className="fa-solid fa-circle-xmark"></i></span></li>
  );

}


// TODO: Rename this component
function ExecuteSqlSection() {
   
  const tabs = useSelector((store: RootState)=>store.tabs.list);
  const currentTab = useSelector((store: RootState)=>store.tabs.active);
  const dispatch = useDispatch();

  function openQueryTab() {
    dispatch(newQueryTab(null));
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
                <CreateTable tabIndex={key} />
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
