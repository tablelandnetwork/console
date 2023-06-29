import React from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { getTabIndexById } from "../../store/tabsSlice";
import Cell from "./Cell";

function Row(props: any): React.JSX.Element {
  const row = useSelector(
    (store: RootState) =>
      (
        store.tabs.list[getTabIndexById(store.tabs.list, props.tabId)]
          .rows as any
      )[props.row]
  );

  return (
    <tr>
      {row.map((column: any, columnKey: any) => {
        return (
          <Cell
            key={columnKey}
            tabId={props.tabId}
            row={props.row}
            column={columnKey}
          />
        );
      })}
    </tr>
  );
}

export default Row;
