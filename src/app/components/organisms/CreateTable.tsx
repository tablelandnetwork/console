
// TODO: Refactor components into seperate files
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendCreateQuery,  columnsSummary } from '../../store/createTableSlice';
import { addColumn, setPrefix, removeColumn, updateColumnProperty } from '../../store/tabsSlice';
import Loading from '../atoms/Loading';
import { RootState } from '../../store/store';
import StepProgressBar from '../atoms/StepProgressBar';

// TODO: Seperate components into files

function CreateColumn(props) {
  const dispatch = useDispatch();
  const column = useSelector((store: RootState)=>store.tabs.list[props.tabIndex].createColumns[props.slot]);

  const setColumnProperty = function(e) {
    dispatch(updateColumnProperty({
      columnIndex: props.slot,
      property: e.target.name,
      checked: e.target.checked,
      value: e.target.value,
      tabId: props.tabIndex
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
      <td><i onClick={e => {
          e.preventDefault();
          dispatch(removeColumn({tabId: props.tabIndex, column: props.slot}));

      }} className="fa-solid fa-x remove-column-x"></i></td>
    </tr>
  )
}

function CreateTableReceipt(props) {
  return "Table created."
}

function CreateTable(props) {
  const tabId = props.tabIndex;
  const { commiting, createColumns, prefix, successMessage } = useSelector((store: RootState)=>store.tabs.list[tabId]);
  const currentNetwork = useSelector((store: RootState) => store.walletConnection.network);
  const dispatch = useDispatch();


  function createTableOnNetwork(e) {
    e.preventDefault();
    // @ts-ignore
    dispatch(sendCreateQuery({query: columnsSummary(createColumns), tab: tabId, options: {prefix}}));
  }

  if(successMessage) {
    return (
      <div>
        <StepProgressBar steps={3} step={3} />
      {successMessage}
      <br></br>---<br></br>
      <button className="button-default">Create another table</button>
      </div>
    );
  }

  if(commiting) {
    return <>
      <StepProgressBar steps={3} step={2} />
      Commiting table: <Loading show={true} />
    </>
  }
  

  return (
    <form onSubmit={createTableOnNetwork}>
      <StepProgressBar steps={3} step={1} />
      <h2>Create Table on {currentNetwork} <i className="fa-solid fa-circle-question tooltip"><span>Switch networks to change the network this table will be created on.</span></i></h2>
      <label className="create-table-prefix"><div>Table Prefix</div>
        <input 
          placeholder='Table Prefix'
          className='form-input'
          type="text" 
          pattern='[a-zA-Z0-9_]*'
          title={"Letter, numbers, and underscores only. First character cannot be a number"}
          value={prefix} 
          onChange={e => {
            dispatch(setPrefix({prefix: e.target.value, tabId: props.tabIndex}));
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
          {createColumns.map((column, key) => {
            return <CreateColumn key={key} slot={key} tabIndex={tabId} />
          })}
        </tbody>
        </table>
      </div>

        <button 
          className="button-default"
          onClick={e => {
            e.preventDefault();
            dispatch(addColumn({tabId}));
        }}><i className="fa-solid fa-plus"></i></button>

        <button
          className="button-default"
          onClick={e => {
            e.preventDefault();
            dispatch(removeColumn({tabId}));
        }}><i className="fa-solid fa-minus"></i></button>

      <button className="button-default">Commit</button>
    </form>
  );
}
export default CreateTable;
