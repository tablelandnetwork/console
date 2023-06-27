import React from "react";
import { useSelector } from "react-redux";
import Cell from "./Cell";
import { RootState } from "../../store/store";
import { getTabIndexById } from "../../store/tabsSlice";

function Row(props) {
  const row = useSelector(
    (store: RootState) =>
      (
        store.tabs.list[getTabIndexById(store.tabs.list, props.tabId)]
          .rows as any
      )[props.row]
  );

  return (
    <tr>
      {row.map((column, columnKey) => {
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
