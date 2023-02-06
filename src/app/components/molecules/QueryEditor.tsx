import React from 'react';
import { useSelector } from 'react-redux';
import { checkQueryType } from '../../store/tabsSlice';
import { updateQuery } from '../../store/tabsSlice';
import CodeEditor from '../atoms/CodeEditor';
import { RootState, useAppDispatch } from '../../store/store';

function QueryEditor(props) {
  const dispatch = useAppDispatch();
  const query = useSelector((store: RootState) => store.tabs.list[props.tab].query);

  return (
    <CodeEditor onChange={code=>{
      dispatch(updateQuery({query: code, tab: props.tab}));
      dispatch(checkQueryType({query: code, tab: props.tab}));
    }} code={query} />
  );
}
export default QueryEditor;
