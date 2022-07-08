import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import CodeEditor from './CodeEditor';
import Table from './Table';

function EditableResultSet(props) {


  const databases = useSelector(store => store.databases);
  const [db, setDb] = useState('tableland'); 


  let resultSet = useSelector(state => state.latestResultset);
  const [query, setQuery] = useState(resultSet?.query || "");
  return (
    <div className='editable-result-set'>
      <form>
      <select class="case-matters" onChange={e => {
        let [db, table] = e.target.value.split(".");
        // TODO: Kill this
        worker.postMessage({
          type: "GENERIC_QUERY",
          query: `SELECT * FROM ${table};`,
          db 
        })
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
          <select defaultValue={db} onChange={e => setDb(e.target.value)}>
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
              // TODO: This is lame
              worker.postMessage({
                type: "GENERIC_QUERY",
                db,
                query
              });
            } catch(e) {
              console.log("This error, lol", e);
            }

            
          }} disabled={!(query.length && db)}>Run local query</button>
        </div>
      </form>
  </div>
  );
}
export default EditableResultSet;
