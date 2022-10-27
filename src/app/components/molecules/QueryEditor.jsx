import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkQueryType } from '../../store/tabsSlice';
import { updateQuery } from '../../store/tabsSlice';
import CodeEditor from '../atoms/CodeEditor';

function QueryEditor(props) {
  const dispatch = useDispatch();
  const query = useSelector(store => store.tabs.list[props.tab].query);


  return (
    <CodeEditor onChange={code=>{
      dispatch(updateQuery({query: code, tab: props.tab}));
      dispatch(checkQueryType({query: code, tab: props.tab}));
    }} code={query} />
  );
}
export default QueryEditor;
