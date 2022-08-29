import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../atoms/Loading";
import TableList from "./TableList";

export default function TableListWithMeta() {
  const dispatch = useDispatch();

  let refreshing = useSelector(store => store.tables.refreshing);

  return (
    <ul className='tables-to-add'>
      <li><strong>Tables</strong><i
        onClick={() => {
          dispatch(refreshTables());
        }}      
        className="fa-solid fa-arrow-rotate-right"></i>
      </li>
      {refreshing ? <Loading /> : <TableList />}
    </ul>
  )
}
