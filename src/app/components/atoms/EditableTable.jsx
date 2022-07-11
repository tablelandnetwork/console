import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { genericQuery } from '../../database/databaseCalls';
import CodeEditor from './CodeEditor';

function EditableResultSet(props) {


  const databases = useSelector(store => store.databases);
  const [db, setDb] = useState('tableland'); 


  let resultSet = useSelector(state => state.latestResultSet);
  const [query, setQuery] = useState(resultSet?.query || "");
  return (
    <div className='editable-result-set'>
      <form>
      <select class="case-matters" onChange={e => {
        let [db, table] = e.target.value.split(".");
        genericQuery(`SELECT * FROM ${table};`, {db, editable: true});
      }}>
        {databases.map(database => {
          return (
            <optgroup label={database.name}>
              {
                database.tables.map(table => {
                  return <option value={`${database.name}.${table.name}`}>{table.name}</option>
                })
              }
            </optgroup>
          );
        })}            
      </select>


        <CodeEditor onChange={code=>{setQuery(code)}} code={query} />

        <div>
          <select title="Database to query" defaultValue={db} onChange={e => setDb(e.target.value)}>
            {
              databases.map(database => {
                return (
                  <option key={database.name}>
                    {database.name}
                  </option>
                );
              })
            }
          </select>
          <button onClick={(event) => {
            try {
              event.preventDefault();
              if (!db) {
                throw(new Error("No database selected"));
              }
              genericQuery(query, {db});

            } catch(e) {
              console.log("This error, lol", e);
            }

            
          }} disabled={!(query.length && db)}>Run local query</button>
          {resultSet.error && <div className="error">Error<br></br>{resultSet.error}</div>}
          <div className="users-input">{resultSet.query}</div>
        </div>
      </form>
  </div>
  );
}
export default EditableResultSet;
