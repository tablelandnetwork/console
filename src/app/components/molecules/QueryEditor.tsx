import React from "react";
import { useSelector } from "react-redux";
import {
  checkQueryType,
  getTabIndexById,
  updateQuery,
} from "../../store/tabsSlice";
import CodeEditor from "../atoms/CodeEditor";
import { type RootState, useAppDispatch } from "../../store/store";

function QueryEditor(props: any): React.JSX.Element {
  const dispatch = useAppDispatch();
  const query = useSelector(
    (store: RootState) =>
      store.tabs.list[getTabIndexById(store.tabs.list, props.tabId)].query
  );

  return (
    <CodeEditor
      onChange={(code: any) => {
        dispatch(updateQuery({ query: code, tabId: props.tabId }));
        void dispatch(checkQueryType({ query: code, tabId: props.tabId }));
      }}
      code={query}
    />
  );
}
export default QueryEditor;
