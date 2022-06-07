import { initBackend } from 'absurd-sql/dist/indexeddb-main-thread.js';

function initializeWorker() {
  let worker = new Worker(new URL('./index.worker.js', import.meta.url));

  initBackend(worker);
}

export default initializeWorker;
