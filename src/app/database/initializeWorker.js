import { initBackend } from 'absurd-sql/dist/indexeddb-main-thread.js';
import { REFRESH_DB_STATE } from '../../consts.js';
import { databaseRefreshed } from '../store/databasesSlice.js';
import { resultSetUpdated } from '../store/resultSetSlice.js';
import store from '../store/store.js';

function initializeWorker() {
  let worker = new Worker(new URL('./index.worker.js', import.meta.url));
  
  worker.addEventListener('message', async (event) => {

    switch(event.data.type) {
      case REFRESH_DB_STATE:
        store.dispatch(databaseRefreshed(event.data.dbs));
        break;
      case "GENERIC_QUERY_RESPONSE":
        store.dispatch(resultSetUpdated(event.data.result));
        break;
    }

    

  });
  initBackend(worker);
  // Zap me
  window.worker = worker;
  return worker;
}

export default initializeWorker;
