import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshTables } from "../../store/tablesSlice";
import Loading from "../atoms/Loading";
import TableList from "./TableList";



export default function TableListWithMeta() {
  const dispatch = useDispatch();
  let refreshing = useSelector(store => store.tables.refreshing);
  const currentNetwork = useSelector(store => store.walletConnection.network);

  function refreshMyTables() {
    dispatch(refreshTables());
  }

  return (
    <ul className='tables-to-add'>
      <li className="tables-to-add--header"><strong>Tables on {currentNetwork}</strong><i
        onClick={refreshMyTables}      
        className="fa-solid fa-arrow-rotate-right"></i>
      </li>
      {refreshing ? <Loading /> : <TableList />}
    </ul>
  )
}
