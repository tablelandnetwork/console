import React from "react";
import { useSelector } from "react-redux";
import Loading from "../atoms/Loading";
import Table from "../atoms/Table";
import { RootState } from '../../store/store';

export default function currentTabPane(props) {
  const { tab } = props;
  const { error, status, message } = useSelector((store: RootState) => store.tabs.list[tab]);
  
  return (
    <div className='table-results'>
      {error && <div className="error">Error<br></br>{error}</div>}
      {message && <div className="message">{message}</div>}
      {status==="loading" ? <Loading /> : <Table tab={tab} />}
    </div>
  )
}
