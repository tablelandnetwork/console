import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

function Table(props: any): React.JSX.Element {
  return (
    <div className="table-container">
      <table className="tabula-rasa">
        <TableHeader tabId={props.tabId} />
        <TableBody tabId={props.tabId} />
      </table>
    </div>
  );
}

export default Table;
