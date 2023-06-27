import React from "react";
import { useSelector } from "react-redux";
import { getTabIndexById, queryTableland } from "../../store/tabsSlice";
import { RootState, useAppDispatch } from "../../store/store";
import { Flags } from "react-feature-flags";

// TODO: Rename
function ExecuteSqlActions(props) {
  const { tabId } = props;
  const tabContent = useSelector(
    (store: RootState) =>
      store.tabs.list[getTabIndexById(store.tabs.list, tabId)]
  );
  const query = useSelector(
    (store: RootState) =>
      store.tabs.list[getTabIndexById(store.tabs.list, tabId)].query
  );
  const queryType = useSelector(
    (store: RootState) =>
      store.tabs.list[getTabIndexById(store.tabs.list, tabId)].queryType
  );
  const dispatch = useAppDispatch();

  function copyQueryText() {
    navigator.clipboard.writeText(
      `${window.location.protocol}//${
        window.location.host
      }/execute?query=${encodeURIComponent(query as any)}`
    );
  }

  function sendQuery(event) {
    event.preventDefault();

    dispatch(queryTableland({ query: query as any, tabId }));
  }

  return (
    <ul className="action-icons-bar">
      <li>
        <Flags authorizedFlags={["savedQueries"]}>
          <button
            className="button-default"
            onClick={() => {
              let savedQueries = JSON.parse(
                localStorage.getItem("savedQueries") as any
              );
              savedQueries = Array.isArray(savedQueries) ? savedQueries : [];
              savedQueries.push({
                query: query,
                name: tabContent.name,
              });
              localStorage.setItem(
                "savedQueries",
                JSON.stringify(savedQueries)
              );
            }}
          >
            Save
          </button>
        </Flags>
        {!tabContent.loading && (
          <button
            className="button-default"
            onClick={sendQuery}
            disabled={!(query as any).length || queryType === "invalid"}
          >
            {queryType === "write" ? "Commit" : "Query"}
          </button>
        )}
      </li>
    </ul>
  );
}

export default ExecuteSqlActions;
