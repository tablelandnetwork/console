import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNetwork } from "wagmi";
import { refreshTables } from "../../store/tablesSlice";
import { newCreateTableTab } from "../../store/tabsSlice";
import Loading from "../atoms/Loading";
import { type RootState, useAppDispatch } from "../../store/store";
import TableList from "./TableList";

export default function TableListWithMeta(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const networkChain = (useNetwork().chain as any).id;

  const [chainId, setChainId] = useState(networkChain);

  if (networkChain !== chainId) {
    setChainId(networkChain);
  }
  const refreshing = useSelector((store: RootState) => store.tables.refreshing);

  async function refreshlist(): Promise<void> {
    void dispatch(refreshTables());
  }

  useEffect(() => {
    setTimeout(() => {
      void refreshlist();
    }, 500);
  }, [chainId]);

  function openCreateTableTab(): void {
    void dispatch(newCreateTableTab(null));
  }

  return (
    <ul className="tables-to-add">
      <li className="tables-to-add--header">
        <strong>Your tables</strong>
        <div className="icons">
          <i
            onClick={() => {
              void refreshlist;
            }}
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
