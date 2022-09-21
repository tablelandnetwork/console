
// TODO: Refactor components into seperate files
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addColumn, setPrefix, removeColumn, columnsSummary, updateColumnProperty, sendCreateQuery } from '../../store/createTableSlice';


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
      <td key={"name"}>
        <input 
          placeholder='Column Name' 
          pattern='[a-zA-Z0-9_]*' 
          className='form-input'
          value={column.name}
          name="name"
          onChange={setColumnProperty}
          title={"Letter, numbers, and underscores only. First character cannot be a number"}
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
          placeholder='null'
          onChange={setColumnProperty} 
        />
      </td>
      <td><i className="fa-solid fa-x"></i></td>
    </tr>
  )
}

function CreateTable(props) {
  const tableName = useSelector(store=>store.createTable.name);
  const columns = useSelector(store=>store.createTable.columns);
  const currentNetwork = useSelector(store => store.walletConnection.network);
  const dispatch = useDispatch();


  function createTableOnNetwork(e) {
    e.preventDefault();
    
    dispatch(sendCreateQuery({query: columnsSummary(columns), options: {prefix: tableName}}));
  }
  

  return (
    <form onSubmit={createTableOnNetwork}>
      <h2>Create Table on {currentNetwork} <i className="fa-solid fa-circle-question tooltip"><span>Switch networks to change the network this table will be created on.</span></i></h2>
      <label className="create-table-prefix"><div>Table Prefix</div>
        <input 
          placeholder='Table Prefix'
          className='form-input'
          type="text" 
          pattern='[a-zA-Z0-9_]*'
          title={"Letter, numbers, and underscores only. First character cannot be a number"}
          value={tableName} 
          onChange={e => {
            dispatch(setPrefix(e.target.value));
          }} />
      </label> 
      <h3>Columns</h3>
      <div className='table-container'>
        <table className='creating-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Not null</th>
            <th>Primary Key</th>
            <th>Unique</th>
            <th>Default value</th>
            <th></th>
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
