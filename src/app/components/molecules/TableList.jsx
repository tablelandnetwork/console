import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkQueryType, setQuery } from "../../store/querySlice";
import { queryTableland } from "../../store/resultSetSlice";

function TableList() {

  const tables = useSelector(store => store.tables.myTables);
  const query = useSelector(store => store.query.value);
  const dispatch = useDispatch();

  return (
    <>
    {
      tables.map(table => {
        return (
          <li key={table.name}>
            {table.name}  
            <span className='table-insert-select' onClick={() => {
              let q = `SELECT * FROM ${table.name} LIMIT 50;`;

              // TODO: Combine into a single dispatch
              dispatch(setQuery(q));
              dispatch(checkQueryType(q));
              dispatch(queryTableland({query:q}))
            }}>
              SELECT
            </span>
            <i className="fa-regular fa-circle-right" onClick={e => {
              // TODO: Combine into a single dispatch
              dispatch(setQuery(query + table.name));
              dispatch(checkQueryType(query + table.name));
              document.getElementById("codeEditor").focus();
            }}></i>
          </li>
        )
      })
    }
    </>
  )
}


export default TableList;
