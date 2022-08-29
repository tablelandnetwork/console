import React, { useState, useEffect } from 'react';
import Table from '../atoms/Table';
import HeaderlessTemplate from '../page-templates/HeaderlessTemplate';
import { useDispatch } from 'react-redux';
import CodeEditor from '../atoms/CodeEditor';
import { resultSetUpdated } from '../../store/resultSetSlice';
import { useSearchParams } from 'react-router-dom';
import Loading from '../atoms/Loading';

function DispalyAndQueryTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [firstLoad, setFirstLoad] = useState(true);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let chainId = searchParams.get("chain");
      let tableId = searchParams.get("table");
      setIsLoading(true);
      const table_name = await fetch(`https://testnet.tableland.network/chain/${chainId}/tables/${tableId}`).then(r => r.json()).then(r=>r.name);
      let queryToSend = query || `SELECT * FROM ${table_name} LIMIT 10;`;
      try {
        const result = await tbl.read(queryToSend);
        dispatch(resultSetUpdated({
          query: query,
          rows: result.rows,
          columns: result.columns.map(c=>c.name)
        }));
        setData(result);
        setQuery(queryToSend);
        setIsLoading(false);
        setFirstLoad(false);
      } catch (e) {
        
        if(e.message.includes("the query isn't a read-query")) {
          window.location.href = 'https://dash.tableland.xyz'; 
        }
      }
      
    };
    if(data===null) {
      fetchData();
    }     
  });



  if(isLoading && firstLoad) {
    return <Loading />
  }

  return (
    <div className='query-window'>
      {isLoading ? <Loading /> : <Table /> }
      
      <div className="editor-wrapper">
        <CodeEditor onChange={code=>{setQuery(code); setButtonDisabled(false);}} code={query} />
      </div>
      <div className='right-buttons'>
        <button disabled={buttonDisabled} onClick={() => setData(null)}>Query</button>
      </div>
    </div>
  )
}

function TablePage(props) {  

  return (
    <HeaderlessTemplate >
      <div className='simple-page'>
        <DispalyAndQueryTable />
      </div>
    </HeaderlessTemplate>
  );
}
export default TablePage;
