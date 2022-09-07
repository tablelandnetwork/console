import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkQueryType, setQuery } from "../../store/querySlice";
import { queryTableland } from "../../store/resultSetSlice";
import { getSchema } from "../../store/tablesSlice";
import Loading from "../atoms/Loading";


function ColumnDetails(props) {

  const { tableName } = props;

  const table = useSelector(store => {
    return store.tables.myTables.find(table=>table.name===tableName);
  });

  return (
    <>
      <li>
        <span><strong>Name</strong></span>
        <span><strong>Type</strong></span>
        <span><strong>Constraints</strong></span>
      </li>
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

  const table = useSelector(store => {
    return store.tables.myTables.find(table=>table.name===tableName);
  });



  if(!table.schema && open) {
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
  const query = useSelector(store => store.query.value);
  const [open, setOpen] = useState(false);
  const table = useSelector(store => {
    return store.tables.myTables.find(table=>table.name===tableName);
  });

  function populateQueryWithSelect() {
    let q = `SELECT * FROM ${table.name} LIMIT 50;`;

    // TODO: Combine into a single dispatch
    dispatch(setQuery(q));
    dispatch(checkQueryType(q));
    dispatch(queryTableland({query:q}));
  }

  function insertThisTableName() {
    // TODO: Combine into a single dispatch
    dispatch(setQuery(query + table.name));
    dispatch(checkQueryType(query + table.name));
    document.getElementById("codeEditor").focus();
  }


  return (
    <li key={table.name}>
      <span className={`${open ? "highlight" : ""} table-actions-bar`} >
        <span onClick={()=>setOpen(!open)}>{table.name} <i className="fa-solid fa-arrow-turn-down"></i></span>
        <span 
          className='table-insert-select' 
          onClick={populateQueryWithSelect}>
          SELECT
        </span>
        <i className="fa-regular fa-circle-right" onClick={insertThisTableName}></i>
      </span>
      <TableColumnDetails open={open} setOpen={setOpen} tableName={table.name} />

    </li>
  );
}

function TableList() {

  const tables = useSelector(store => store.tables.myTables);

  return (
    <>
    {
      tables.map(table => <TableListItem key={table.name} tableName={table.name} />)
    }
    </>
  )
}


export default TableList;
