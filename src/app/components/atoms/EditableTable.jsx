import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CodeEditor from './CodeEditor';

function EditableResultSet(props) {

  const dispatch = useDispatch();
  const databases = useSelector(store => store.databases);
  const [db, setDb] = useState('tableland'); 


  let resultSet = useSelector(state => state.latestResultSet);
  const [query, setQuery] = useState(resultSet?.query || "");
  return (
    <div className='editable-result-set'>
      <form>     


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
        </div>
      </form>
  </div>
  );
}
export default EditableResultSet;
