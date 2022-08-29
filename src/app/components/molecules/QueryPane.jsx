import React from "react"
import ExecuteSqlActions from "./ExecuteSqlActions"
import QueryEditor from "./QueryEditor";

export default function QueryPage() {
  return (
    <div className='executer'>
      <div className='editor-container'>
        <QueryEditor />
      </div>
      <ExecuteSqlActions />
    </div>
  )
}
