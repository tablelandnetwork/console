import React from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

function ExportDatabases(props: any): React.JSX.Element {
  const tables = useSelector((store: RootState) => store.tables.list);

  return (
    <div className="export-database">
      {tables.map((table) => {
        return (
          <div>
            <input type="checkbox" />
            {table.name}
          </div>
        );
      })}
      <button className="button-default">
        Export Tables to SQLite Database
      </button>
    </div>
  );
}
export default ExportDatabases;
