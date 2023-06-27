import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshTables } from "../../store/tablesSlice";
import { newCreateTableTab } from "../../store/tabsSlice";
import Loading from "../atoms/Loading";
import TableList from "./TableList";
import { RootState, useAppDispatch } from "../../store/store";
import { useNetwork } from "wagmi";

export default function TableListWithMeta() {
  const dispatch = useAppDispatch();

  const networkChain = (useNetwork().chain as any).id;

  const [chainId, setChainId] = useState(networkChain);

  if (networkChain !== chainId) {
    setChainId(networkChain);
  }
  let refreshing = useSelector((store: RootState) => store.tables.refreshing);

  async function refreshlist() {
    dispatch(refreshTables());
  }

  useEffect(() => {
    setTimeout(() => {
      refreshlist();
    }, 500);
  }, [chainId]);

  function openCreateTableTab() {
    dispatch(newCreateTableTab(null));
  }

  return (
    <ul className="tables-to-add">
      <li className="tables-to-add--header">
        <strong>Your tables</strong>
        <div className="icons">
          <i
            onClick={refreshlist}
            className="fa-solid fa-arrow-rotate-right refresh-icon"
          ></i>
          <button className="button-default" onClick={openCreateTableTab}>
            Create Table
          </button>
        </div>
      </li>
      {refreshing ? <Loading show={true} /> : <TableList />}
    </ul>
  );
}
