import React from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { refreshTables } from '../../store/tablesSlice';
import MyTablesList from '../molecules/MyTablesList';


function TableEditor() {
  
  const dispatch = useDispatch()
  return (
    <>
      <button onClick={() => {
        dispatch(refreshTables());
      }}>Refresh tables <i className="fa-solid fa-arrow-rotate-right"></i></button>
      <MyTablesList />
    </>
  );
}
export default TableEditor;
