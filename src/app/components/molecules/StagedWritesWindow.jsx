import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearStaged, queryRemoved } from '../../store/queryListSlice';
import { highlight, languages } from "prismjs/components/prism-core";
import { queryLocal } from '../../database/databaseCalls';
import populateFromTableland from '../../database/populateFromTableland';

function StagedWritesWindow(props) {

  const dispatch = useDispatch();
  const queryList = useSelector(store => store.queryList);
  return (
    <div className="staged-writes">
      <ol className="staged-writes--list" type="1">
        {
          queryList.map((query, position) => {
            return (
              <li 
                key={query}>
                <span dangerouslySetInnerHTML={{__html: highlight(query, languages.sql)}}></span>
                <span onClick={e=> {
                  dispatch(queryRemoved({position}))
                }} className="delete">X</span>
              </li>
            );
          })
        }
      </ol>
      <div className="staged-writes--actions">
        <button className='subtle' onClick={ async () => {
          dispatch(clearStaged());
          queryLocal(await populateFromTableland());
          
        }}>Clear</button>
        <button onClick={async e => {
          await Promise.all(queryList.map(query => {
            return tbl.write(query);
          }));
          dispatch(clearStaged());
        }}>Commit to network <span className='fa fa-cloud-upload-alt' /></button>
      </div>
  </div>
  );
}
export default StagedWritesWindow;
