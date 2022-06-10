import { initBackend } from 'absurd-sql/dist/indexeddb-main-thread.js';
import { REFRESH_DB_STATE } from '../../consts.js';
import { databaseRefreshed } from '../store/databasesSlice.js';
import store from '../store/store.js';

function initializeWorker() {
  let worker = new Worker(new URL('./index.worker.js', import.meta.url));
  
  worker.addEventListener('message', async (event) => {

    if(event.data.type===REFRESH_DB_STATE) {
      store.dispatch(databaseRefreshed(event.data.dbs));
    }

  })
  initBackend(worker);
  return worker;
}

export default initializeWorker;
