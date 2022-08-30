import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkQueryType, setQuery } from '../../store/querySlice';
import CodeEditor from '../atoms/CodeEditor';

function QueryEditor() {
  const dispatch = useDispatch();
  const query = useSelector(store => store.query.value);

  return (
    <CodeEditor onChange={code=>{
      dispatch(setQuery(code));
      dispatch(checkQueryType(code));
    }} code={query} />
  );
}
export default QueryEditor;
