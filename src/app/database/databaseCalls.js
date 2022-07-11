import { GENERIC_QUERY, PREPARED_QUERY } from "../../consts";
import { resultSetUpdated } from "../store/resultSetSlice";
import store from "../store/store";


export function viewTable(table, db) {

}

export async function genericQuery(query, options={}) {
  
  const id = Math.random();
  worker.addEventListener('message', e => {
    if(e.data.responseId!==id) return; 
    let result = e.data.result;
    result.editable = options.editable;
    store.dispatch(resultSetUpdated(result));    
  });

  
  const message = {
    id,
    type: GENERIC_QUERY,
    query: query,
    db: options.db ?? "tableland"
  };
  worker.postMessage(message);

  
  // Await response

}

export function preparedQuery(query, args, options={}) {


  const message = {
    type: PREPARED_QUERY,
    query: query,
    args,
    db: options.db ?? "tableland"
  };
  worker.postMessage(message);
}
