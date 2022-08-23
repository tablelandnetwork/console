import React from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { refreshTables } from '../../store/tablesSlice';
import MyTablesList from '../molecules/MyTablesList';


function TableEditor() {
  
  const dispatch = useDispatch()

  let refreshing = useSelector(store => store.tables.refreshing);
  return (
    <>
      <button onClick={() => {
        dispatch(refreshTables());
      }}>Refresh tables {refreshing ? <i className='fa-solid fa-rotate fa-spin'></i> : ''}</button>
      <MyTablesList />
    </>
  );
}
export default TableEditor;
