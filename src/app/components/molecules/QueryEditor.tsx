import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkQueryType } from '../../store/tabsSlice';
import { updateQuery } from '../../store/tabsSlice';
import CodeEditor from '../atoms/CodeEditor';
import { RootState } from '../../store/store';

function QueryEditor(props) {
  const dispatch = useDispatch();
  const query = useSelector((store: RootState) => store.tabs.list[props.tab].query);

  return (
    <CodeEditor onChange={code=>{
      dispatch(updateQuery({query: code, tab: props.tab}));
      // @ts-ignore
      dispatch(checkQueryType({query: code, tab: props.tab}));
    }} code={query} />
  );
}
export default QueryEditor;
