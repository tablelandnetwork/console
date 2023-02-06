import React from 'react';
import { useSelector } from 'react-redux';
import { checkQueryType, getTabIndexById } from '../../store/tabsSlice';
import { updateQuery } from '../../store/tabsSlice';
import CodeEditor from '../atoms/CodeEditor';
import { RootState, useAppDispatch } from '../../store/store';

function QueryEditor(props) {
  const dispatch = useAppDispatch();
  const query = useSelector((store: RootState) => store.tabs.list[getTabIndexById(store.tabs.list, props.tabId)].query);

  return (
    <CodeEditor onChange={code=>{
      dispatch(updateQuery({query: code, tabId: props.tabId}));
      dispatch(checkQueryType({query: code, tabId: props.tabId}));
    }} code={query} />
  );
}
export default QueryEditor;
