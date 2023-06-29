import React from "react";
import { useSelector } from "react-redux";
import { getTabIndexById } from "../../store/tabsSlice";
import { type RootState } from "../../store/store";
import Loading from "../atoms/Loading";
import Table from "../atoms/Table";

export default function currentTabPane(props: any): React.JSX.Element {
  const { tabId } = props;
  const { error, status, message } = useSelector(
    (store: RootState) =>
      store.tabs.list[getTabIndexById(store.tabs.list, tabId)]
  );

  return (
    <div className="table-results">
      {error && (
        <div className="error">
          Error<br></br>
          {error}
        </div>
      )}
      {message && <div className="message">{message}</div>}
      {status === "loading" ? <Loading /> : <Table tabId={tabId} />}
    </div>
  );
}
