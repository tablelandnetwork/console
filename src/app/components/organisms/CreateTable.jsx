import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addColumn, setPrefix, removeColumn, columnsSummary, updateColumnProperty } from '../../store/createTableSlice';
import { SUPPORTED_CHAINS } from '@tableland/sdk';
import { globalWeb3modal } from '../molecules/WalletConnect';

function CreateColumn(props) {
  const dispatch = useDispatch();
  const column = useSelector(store=>store.createTable.columns[props.slot]);

  const setColumnProperty = function(e) {
    dispatch(updateColumnProperty({
      columnIndex: props.slot,
      property: e.target.name,
      checked: e.target.checked,
      value: e.target.value
    }));
  }

  return (
    <tr>
      <td>
        <input 
          placeholder='Column Name' 
          pattern='[a-zA-Z][a-zA-Z0-9]*' 
          className='form-input'
          value={column.name}
          name="name"
          onChange={setColumnProperty}
          />
      </td>
      <td>
        <select 
          name="type"
          value={column.type}   
          onChange={setColumnProperty}   
        >
          <option value="any">Any</option>
          <option value="text">Text</option>
          <option value="integer">Integer</option>
        </select>
      </td>
      <td>
        <input
          name="notNull"
          checked={column.notNull}
          type="checkbox"            
          onChange={setColumnProperty}
        />
      </td>
      <td>
        <input      
          name="primaryKey"     
          checked={column.primaryKey}
          type="checkbox"          
          onChange={setColumnProperty}
        />
      </td>
      <td>
        <input        
          name="unique"
          value={column.unique}
          checked={column.unique}   
          type="checkbox"           
          onChange={setColumnProperty} 
        />
      </td>
      <td>
        <input           
          type="text" 
          className='form-input' 
          name="default" 
          onChange={setColumnProperty} 
        />
      </td>
    </tr>
  )
}

function CreateTable(props) {
  const tableName = useSelector(store=>store.createTable.name);
  const columns = useSelector(store=>store.createTable.columns);
  const currentNetwork = useSelector(store => store.walletConnection.network);
  const dispatch = useDispatch();

  const supportedChains = Object.entries(SUPPORTED_CHAINS);
  
  return (
    <form onSubmit={e => {
      e.preventDefault();
      tbl.create(columnsSummary(columns), {prefix: tableName});
    }}>
      <label><div>Table Prefix</div>
        <input 
          placeholder='Table Prefix'
          className='form-input'
          type="text" 
          value={tableName} 
          onChange={e => {
            dispatch(setPrefix(e.target.value));
          }} />
      </label> 
      <select onChange={async e => {
        let prov = await globalWeb3modal.connect();

        prov.request({
          method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${e.target.value.toString(16)}` }],
          });
      }}>
        {supportedChains.map((chain, key) => {
            return <option key={`${chain[1].chainId}-${key}`} value={chain[1].chainId}>{chain[1].phrase}</option>
          })}
      </select>
      <div className='table-container'>
        <table className='tabula-rasa'>        
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>NN <i className="fa-solid fa-circle-question" title="Not null"></i></th>
            <th>PK <i className="fa-solid fa-circle-question" title="Primary Key"></i></th>
            <th>U <i className="fa-solid fa-circle-question" title="Unique"></i></th>
            <th>Default value</th>
          </tr>
        </thead>
        <tbody>
          {columns.map((column, key) => {
            return <CreateColumn key={key} slot={key} />
          })}
        </tbody>
        </table>
      </div>

        <button onClick={e => {
          e.preventDefault();
          dispatch(addColumn());
        }}><i className="fa-solid fa-plus"></i></button>

        <button onClick={e => {
          e.preventDefault();
          dispatch(removeColumn());
        }}><i className="fa-solid fa-minus"></i></button>

      <button>Commit</button>
    </form>
  );
}
export default CreateTable;
