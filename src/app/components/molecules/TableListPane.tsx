import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshTables } from "../../store/tablesSlice";
import { newCreateTableTab } from "../../store/tabsSlice";
import Loading from "../atoms/Loading";
import TableList from "./TableList";
import { RootState } from "../../store/store";


export default function TableListWithMeta() {
  const dispatch = useDispatch();
  let refreshing = useSelector((store: RootState) => store.tables.refreshing);
  const currentNetwork = useSelector((store: RootState) => store.walletConnection.network);

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
        <strong>Tables on {currentNetwork}</strong>
        <div className="icons">
          <i 
            onClick={refreshMyTables}      
            className="fa-solid fa-arrow-rotate-right"
          ></i>
          <i className="fa-solid fa-circle-plus highlight" onClick={openCreateTableTab}></i>
        </div>
      </li>
      {refreshing ? <Loading /> : <TableList />}
    </ul>
  )
}
