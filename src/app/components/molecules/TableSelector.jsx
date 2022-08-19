import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {newBrowse } from '../../store/browseSlice';

function TableSelector(props) {
  
  const tables = useSelector(store => store.tables);
  const dispatch = useDispatch();

  return (
    <select className="case-matters" onChange={e => {
      dispatch(newBrowse({table: e.target.value}));
    }} defaultValue="healthbot_1_1">
      {
        tables.myTables.map((table, key) => {
          return <option key={table.name + key} value={`${table.name}`}>{table.name}</option>
        })
      }          
    </select>
  );
}
export default TableSelector;
