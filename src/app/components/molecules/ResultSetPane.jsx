import React from "react";
import { useSelector } from "react-redux";
import Loading from "../atoms/Loading";
import Table from "../atoms/Table";

export default function currentTabPane(props) {
  const { tab } = props;
  const currentTab = useSelector(store => store.tabs.list[tab]);
  


  return (
    <div className='table-results'>
      {currentTab.error && <div className="error">Error<br></br>{currentTab.error}</div>}
      {currentTab.query === "" ? <div className="results-will-load">Results will load here</div> : null}
      {currentTab.status==="loading" ? <Loading /> : <Table tab={tab} />}
    </div>
  )
}
