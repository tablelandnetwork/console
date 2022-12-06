import React from "react"
import { useSelector } from "react-redux";
import Loading from "../atoms/Loading";
import ExecuteSqlActions from "./ExecuteSqlActions"
import QueryEditor from "./QueryEditor";
import { RootState } from '../../store/store';
// TODO: Update name

export default function QueryPage(props) {
  const tabContent = useSelector((store: RootState) => store.tabs.list[props.tab])
  
  return (
    <div className='executer'>
      <div className='editor-container'>
        <QueryEditor tab={props.tab} />
      </div>
      <Loading show={tabContent.loading} />
      <ExecuteSqlActions tab={props.tab} />
    </div>
  )
}
