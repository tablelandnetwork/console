import React, { useEffect } from 'react';
import TableSelector from '../molecules/TableSelector';
import Table from '../atoms/Table';
import CellEditor from '../molecules/CellEditor'; 
import { useSelector, useDispatch } from 'react-redux';
import { modeSet } from '../../store/modeSlice';
import { useSearchParams } from 'react-router-dom';
import { newBrowse } from '../../store/browseSlice';
import Loading from '../atoms/Loading';

function BrowseData(props) {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const browseStatus = useSelector(store => store.browse.status);
  const initTable = useSelector(store => store.tables.myTables[0]);


  const mode = useSelector(store => store.mode);
  const dispatch = useDispatch();
  if(mode!=="browse") {
    dispatch(modeSet("browse"))
  }

  useEffect(() => {
    if (searchParams.has("table")) {
      const token = searchParams.get("table");
      if (token) {
        searchParams.delete("table");
        dispatch(newBrowse({table: token}));
        setSearchParams(searchParams);
      }
    } else if (browseStatus==="init") {
      dispatch(newBrowse({table: initTable}));
    }
  }, []);


  return (
    <>
      <TableSelector />
      {
        browseStatus==="loading" ? <Loading /> : <Table />
      }
      <CellEditor />
    </>
  );
}
export default BrowseData;
