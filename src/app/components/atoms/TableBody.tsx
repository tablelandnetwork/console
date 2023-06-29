import React from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { getTabIndexById } from "../../store/tabsSlice";
import Row from "./Row";

function TableBody(props: any): React.JSX.Element {
  const rows = useSelector(
    (store: RootState) =>
      store.tabs.list[getTabIndexById(store.tabs.list, props.tabId)].rows
  );
  // @ts-expect-error TableBody returns null
  if (!rows) return null;

  return (
    <tbody>
      {rows.map((row, rowKey) => {
        return <Row tabId={props.tabId} key={rowKey} {...props} row={rowKey} />;
      })}
    </tbody>
  );
}
export default TableBody;
