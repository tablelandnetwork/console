import React from "react"
import { useSelector } from "react-redux";
import Loading from "../atoms/Loading";
import ExecuteSqlActions from "./ExecuteSqlActions"
import QueryEditor from "./QueryEditor";
import { RootState } from '../../store/store';
import { getTabIndexById } from "../../store/tabsSlice";

// TODO: Update name
export default function QueryPane(props) {
  const tabContent = useSelector((store: RootState) => store.tabs.list[getTabIndexById(store.tabs.list, props.tabId)])
  
  return (
    <div className='executer'>
      <div className='editor-container'>
        <QueryEditor tabId={props.tabId} />
      </div>
      <Loading show={tabContent.loading} />
      <ExecuteSqlActions tabId={props.tabId} />
    </div>
  )
}
