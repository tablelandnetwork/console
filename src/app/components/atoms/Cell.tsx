import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedCellUpdated } from "../../store/selectedCellSlice";
import { type RootState } from "../../store/store";
import { getTabIndexById } from "../../store/tabsSlice";
import CodeEditor from "./CodeEditor";

function Cell(props: any): React.JSX.Element {
  const { row, column } = props;
  const dispatch = useDispatch();
  const cell = useSelector(
    (store: RootState) =>
      store.tabs.list[getTabIndexById(store.tabs.list, props.tabId)].rows as any
  )[props.row][props.column];
  const selectedCell = useSelector((store: RootState) => store.selectedCell);
  const selectedClass =
    row === selectedCell.row && column === selectedCell.column
      ? "selected"
      : "";

  let cellContents = cell;

  // If is JSON, highlight it
  if (typeof cell === "object" && cell !== null) {
    cellContents = (
      <CodeEditor
        hideLineNumbers={true}
        code={JSON.stringify(cell)}
      ></CodeEditor>
    );
  }

  return (
    <td
      onClick={() => dispatch(selectedCellUpdated({ ...props }))}
      className={selectedClass}
    >
      {cellContents}
    </td>
  );
}

export default Cell;
