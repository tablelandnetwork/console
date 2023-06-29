import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { type RootState } from "../../store/store";
import QueryPane from "../molecules/QueryPane";
import ResultSetPane from "../molecules/ResultSetPane";
import {
  closeTab,
  newQueryTab,
  activateTab,
  renameTab,
  getTabIndexById,
} from "../../store/tabsSlice";
import CreateTable from "./CreateTable";

// TODO: Separate files for components

function TabLabel(props: any): React.JSX.Element {
  const dispatch = useDispatch();
  const currentTab = useSelector((store: RootState) => store.tabs.active);
  const tab = useSelector(
    (store: RootState) =>
      store.tabs.list[getTabIndexById(store.tabs.list, props.tabId)]
  );

  function switchToTab(key: any): void {
    dispatch(activateTab(key));
  }

  function closeThisTab(e: any): void {
    e.preventDefault();
    e.stopPropagation();
    dispatch(closeTab({ tabId: props.tabId }));
  }

  const ref = useRef();

  useEffect(() => {
    if (ref?.current)
      (ref?.current as any).scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "center",
      });
  }, []);

  return (
    <li
      className={props.tabId === currentTab ? "active" : "not-active"}
      onClick={() => {
        switchToTab(props.tabId);
      }}
      ref={ref as any}
    >
      {tab.type === "create" ? (
        <i className="fa-regular fa-square-plus"></i>
      ) : (
        <i className="fa-solid fa-terminal"></i>
      )}
      <input
        type="name"
        style={{
          pointerEvents: props.tabId !== currentTab ? "none" : "initial",
        }}
        value={tab.name}
        onChange={(e) => {
          dispatch(renameTab({ tab: props.tabId, name: e.target.value }));
        }}
      />
      <span onClick={closeThisTab}>
        <i className="fa-solid fa-circle-xmark"></i>
      </span>
    </li>
  );
}

// TODO: Rename this component
function ExecuteSqlSection(): React.JSX.Element {
  const tabs = useSelector((store: RootState) => store.tabs.list);
  const currentTab = useSelector((store: RootState) => store.tabs.active);
  const dispatch = useDispatch();

  function openQueryTab(): void {
    dispatch(newQueryTab({ tabId: uuidv4() }));
  }

  return (
    <div className="tabs-pane">
      <div>
        <ul className="tab-nav">
          {tabs.map((tab, key) => {
            return <TabLabel key={tab.tabId} tabId={tab.tabId} />;
          })}
          <li onClick={openQueryTab}>
            <i className="fa-solid fa-circle-plus highlight"></i>
          </li>
        </ul>
      </div>
      {tabs.map((tab, key) => {
        const className = currentTab === tab.tabId ? "open" : "closed";
        if (tab.type === "create") {
          return (
            <div key={tab.tabId} className={`${className} single-tab-pane`}>
              <CreateTable tabId={tab.tabId} />
            </div>
          );
        }

        return (
          <div key={tab.tabId} className={`${className} single-tab-pane`}>
            <QueryPane tabId={tab.tabId} />

            <ResultSetPane tabId={tab.tabId} />
          </div>
        );
      })}
    </div>
  );
}

export default ExecuteSqlSection;
