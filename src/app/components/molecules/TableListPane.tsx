import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshTables } from "../../store/tablesSlice";
import { newCreateTableTab } from "../../store/tabsSlice";
import Loading from "../atoms/Loading";
import TableList from "./TableList";
import { RootState } from "../../store/store";


export default function TableListWithMeta() {
  const dispatch = useDispatch();
  let refreshing = useSelector((store: RootState) => store.tables.refreshing);
  const tblConnected = useSelector((store: RootState) => store.walletConnection.connected);
  const [init, setInit] = useState(false);

  if(!init && tblConnected) {
    refreshMyTables();
    setInit(true);
  }


  function refreshMyTables() {
    // @ts-ignore
    dispatch(refreshTables());
  }

  function openCreateTableTab() {
    dispatch(newCreateTableTab(null));
  }

  return (
    <ul className='tables-to-add'>
      <li className="tables-to-add--header">
        <strong>Your tables</strong>
        <div className="icons">
          <i 
            onClick={refreshMyTables}      
            className="fa-solid fa-arrow-rotate-right"
          ></i>
          <button onClick={openCreateTableTab}>Create Table</button>
        </div>
      </li>
      {refreshing ? <Loading /> : <TableList />}
    </ul>
  )
}
