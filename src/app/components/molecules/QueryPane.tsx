import React from "react"
import ExecuteSqlActions from "./ExecuteSqlActions"
import QueryEditor from "./QueryEditor";

// TODO: Update name

export default function QueryPage(props) {
  return (
    <div className='executer'>
      <div className='editor-container'>
        <QueryEditor tab={props.tab} />
      </div>
      <ExecuteSqlActions tab={props.tab} />
    </div>
  )
}
