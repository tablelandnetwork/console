import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newQueryTab } from "../../store/tabsSlice";
import { getSchema } from "../../store/tablesSlice";
import Loading from "../atoms/Loading";
import { RootState } from '../../store/store';

function ColumnDetails(props) {

  const { tableName } = props;

  const table = useSelector((store: RootState) => {
    return store.tables.myTables.find(table=>table.name===tableName);
  });

  return (
    <>
    {table.schema.columns.map(column => {
      return (
        <li key={`${tableName}-${column.name}`}>
          <span>{column.name}</span>
          <span>{column.type}</span>
          <span>{column.constraints.join(" ")}</span>
        </li>
      )
    })}

    </>
  );
}

function TableColumnDetails(props) {
  const { open, tableName } = props;
  const dispatch = useDispatch();

  const table = useSelector((store: RootState) => {
    return store.tables.myTables.find(table=>table.name===tableName);
  });



  if(!table.schema && open) {
    // @ts-ignore
    dispatch(getSchema({tableName}));
  }
  if(!table.schema) {
    return <Loading show={open} />
  }

  return (
    <ul className={`table-schema ${open ? 'open' : 'closed'}`} >
      <ColumnDetails tableName={tableName} />
    </ul>
  );
}


function TableListItem(props) {

  const { tableName } = props;

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const table = useSelector((store: RootState) => {
    return store.tables.myTables.find(table=>table.name===tableName);
  });

  function populateQueryWithSelect() {
    let q = `SELECT * FROM ${table.name} LIMIT 50;`;
    dispatch(newQueryTab({query: q}));
  }


  return (
    <li key={table.name}>
      <span className={`${open ? "highlight" : ""} table-actions-bar`} >
        <span onClick={()=>setOpen(!open)}>{table.name}</span>
        <span 
          className='table-insert-select' 
          onClick={populateQueryWithSelect}>
          SELECT
        </span>
        <i className="fa-regular fa-copy" title="Copy table name" onClick={() => navigator.clipboard.writeText(table.name)}></i>
      </span>
      <TableColumnDetails open={open} setOpen={setOpen} tableName={table.name} />

    </li>
  );
}

function TableList() {

  const tables = useSelector((store: RootState) => store.tables.myTables);

  return (
    <>
    {
      tables.map(table => <TableListItem key={table.name} tableName={table.name} />)
    }
    </>
  )
}


export default TableList;
