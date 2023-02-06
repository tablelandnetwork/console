import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newQueryTab } from "../../store/tabsSlice";
import { RootState } from '../../store/store';
import { Address, useAccount, useNetwork } from 'wagmi';
import { activateToast } from "../../store/toastsSlice";
import Loading from "../atoms/Loading";
import { getTablelandConnection } from "../../database/connectToTableland";


// TODO: Refactor components into seperate files

function ColumnDetails(props) {

  const { tableName } = props;

  const table = useSelector((store: RootState) => {
    return store.tables.list.find(table=>table.name===tableName);
  });

  return (
    <>
    {table.schema.columns.map(column => {
      return (
        <li key={`${tableName}-${column.name}`}>
          <span>{column.name}</span>
          <span>{column.type}</span>
          <span>{column?.constraints?.join(" ")}</span>
        </li>
      )
    })}

    </>
  );
}



function TableColumnDetails(props) {
  const { open, tableName } = props;
  const controller = useAccount();


  return (
    <ul className={`table-schema ${open ? 'open' : 'closed'}`} >
      <ColumnDetails tableName={tableName} />
      <li><span className="controller">Controller: {controller.address} <i className="fa-solid fa-arrow-up-from-bracket"></i></span></li>
    </ul>
  );
}


function TableListItem(props) {

  const { tableName } = props;

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const table = useSelector((store: RootState) => {
    return store.tables.list.find(table=>table.name===tableName);
  });

  function populateQueryWithSelect() {
    let q = `SELECT * FROM ${table.name} LIMIT 50;`;
    dispatch(newQueryTab({query: q, title: `Query: ${table.name}`}));
  }


  return (
    <li key={table.name}>
      <span className={`${open ? "highlight" : ""} table-actions-bar`} >
        <span onClick={()=>setOpen(!open)}> 
          {open ? <i className="fa-solid fa-caret-up"></i> : <i className="fa-solid fa-caret-down"></i>
          }  {table.name}
        </span>
        <span 
          className='table-insert-select button-default' 
          onClick={populateQueryWithSelect}>
          QUERY
        </span>
        <i className="fa-regular fa-copy" title="Copy table name" onClick={() => {
          navigator.clipboard.writeText(table.name);
          dispatch(activateToast({message: `Copied: ${table.name}`, type: "success"}));
        }}></i>
      </span>
      <TableColumnDetails open={open} setOpen={setOpen} tableName={table.name} />

    </li>
  );
}

function TableList() {


  const list = useSelector((store: RootState) => store.tables.list);

  const network = useNetwork();  
  
  if(list.length===0) {
    return (
      <div className="no-tables-message message">
        You have no tables on the {network.chain.name} chain. Create a table to get started.
      </div>
    );
  }

  return (
    <>
    {
      list.map(table => <TableListItem key={table.name} tableName={table.name} />)
    }
    </>
  )
}


export default TableList;
