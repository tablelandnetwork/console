import React from "react";
import { useSelector } from "react-redux";
import Loading from "../atoms/Loading";
import Table from "../atoms/Table";
import { RootState } from '../../store/store';

export default function currentTabPane(props) {
  const { tab } = props;
  const currentTab = useSelector((store: RootState) => store.tabs.list[tab]);
  


  return (
    <div className='table-results'>
      {currentTab.error && <div className="error">Error<br></br>{currentTab.error}</div>}
      {currentTab.message && <div className="message">{currentTab.message}</div>}
      {currentTab.status==="loading" ? <Loading /> : <Table tab={tab} />}
    </div>
  )
}
