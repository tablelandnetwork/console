import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAccount, useNetwork } from "wagmi";
import { v4 as uuidv4 } from "uuid";
import { newQueryTab, queryTableland } from "../../store/tabsSlice";
import { type RootState, useAppDispatch } from "../../store/store";
import { activateToast } from "../../store/toastsSlice";

// TODO: Refactor components into separate files

function ColumnDetails(props: any): React.JSX.Element {
  const { tableName } = props;

  const table = useSelector((store: RootState) => {
    return store.tables.list.find((table) => table.name === tableName);
  });

  return (
    <>
      {(table as any).schema.columns.map((column: any) => {
        return (
          <li key={`${tableName as string}-${column.name as string}`}>
            <span>{column.name}</span>
            <span>{column.type}</span>
            <span>{column?.constraints?.join(" ")}</span>
          </li>
        );
      })}
    </>
  );
}

function TableColumnDetails(props: any): React.JSX.Element {
  const { open, tableName } = props;
  const controller = useAccount();

  return (
    <ul className={`table-schema ${open ? "open" : "closed"}`}>
      <ColumnDetails tableName={tableName} />
      <li>
        <span className="controller">
          Controller: {controller.address}{" "}
          <i className="fa-solid fa-arrow-up-from-bracket"></i>
        </span>
      </li>
    </ul>
  );
}

function TableListItem(props: any): React.JSX.Element {
  const { tableName } = props;

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const table = useSelector((store: RootState) => {
    return store.tables.list.find((table) => table.name === tableName);
  });

  function populateQueryWithSelect(): void {
    const q = `SELECT * FROM ${(table as any).name as string} LIMIT 50;`;
    const newTabId = uuidv4();
    dispatch(
      newQueryTab({
        query: q,
        title: `Query: ${(table as any).name as string}`,
        tabId: newTabId,
      })
    );
    void dispatch(queryTableland({ query: q, tabId: newTabId }));
  }

  return (
    <li key={(table as any).name}>
      <span className={`${open ? "highlight" : ""} table-actions-bar`}>
        <span
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? (
            <i className="fa-solid fa-caret-up"></i>
          ) : (
            <i className="fa-solid fa-caret-down"></i>
          )}{" "}
          {(table as any).name}
        </span>
        <span
          className="table-insert-select button-default"
          onClick={populateQueryWithSelect}
        >
          QUERY
        </span>
        <i
          className="fa-regular fa-copy"
          title="Copy table name"
          onClick={() => {
            void navigator.clipboard.writeText((table as any).name);
            dispatch(
              activateToast({
                message: `Copied: ${(table as any).name as string}`,
                type: "success",
              })
            );
          }}
        ></i>
      </span>
      <TableColumnDetails
        open={open}
        setOpen={setOpen}
        tableName={(table as any).name}
      />
    </li>
  );
}

function TableList(): React.JSX.Element {
  const malformedTables = useSelector(
    (store: RootState) => store.pageState.malformedTables
  );
  const list = useSelector((store: RootState) => store.tables.list);

  const [showMalformed, setShowMalformed] = useState(true);

  const network = useNetwork();

  if (list.length === 0) {
    return (
      <div className="no-tables-message message">
        You have no tables on the {(network.chain as any).name} chain. Create a
        table to get started.
      </div>
    );
  }

  return (
    <>
      {list.map((table) => (
        <TableListItem key={table.name} tableName={table.name} />
      ))}
      {malformedTables.length > 0 && showMalformed && (
        <div className="malformed-tables-message message">
          <div className="error">
            You own at least one malformed table. This may be because of
            malformed create statements. These have been omitted.{" "}
            {malformedTables.join(", ")}
            <br />
            <i
              className="fa fa-x exit"
              onClick={() => {
                setShowMalformed(!showMalformed);
              }}
            ></i>
          </div>
        </div>
      )}
    </>
  );
}

export default TableList;
