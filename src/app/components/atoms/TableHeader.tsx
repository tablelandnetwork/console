import React from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { getTabIndexById } from "../../store/tabsSlice";

function HeaderRow(props: any): React.JSX.Element {
  const columns = useSelector(
    (store: RootState) =>
      store.tabs.list[getTabIndexById(store.tabs.list, props.tabId)].columns
  );
  // @ts-expect-error HeaderRow returns null
  if (!columns) return null;

  return (
    <thead>
      <tr>
        {columns.map((column, columnKey) => {
          return <th key={column.name}>{column.name}</th>;
        })}
      </tr>
    </thead>
  );
}
export default HeaderRow;
