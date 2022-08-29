import React from "react";
import { useSelector } from "react-redux";
import Loading from "../atoms/Loading";
import Table from "../atoms/Table";

export default function ResultSetPane() {
  let resultSet = useSelector(store => store.tablelandQuery);

  return (
    <div className='table-results'>
      {resultSet.error && <div className="error">Error<br></br>{resultSet.error}</div>}
      {resultSet.query === "" ? "Results will load here" : null}
      {resultSet.status==="loading" ? <Loading /> : <Table />}
    </div>
  )
}
