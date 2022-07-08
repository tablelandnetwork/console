import React from 'react';
import reactDom from 'react-dom/client';
import Main from './components/Main.jsx';
import initializeWorker from './database/initializeWorker.js';
import { connect } from '@tableland/sdk';



async function startTableLand() {

  // TODO: Destroy this trash. Global things are lame
  const tbl = await connect({
    chain: "ethereum-goerli"
  });
  window.tbl = tbl;  
  
}

startTableLand();

initializeWorker();

document.addEventListener("DOMContentLoaded", () => {
  reactDom.createRoot(document.getElementById("app")).render(<Main />);
});
