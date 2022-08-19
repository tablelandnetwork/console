import React from 'react';
import reactDom from 'react-dom/client';
import Main from './components/Main.jsx';
import initializeWorker from './database/initializeWorker.js';
import { connect } from '@tableland/sdk';
import init from '@tableland/sqlparser';

async function startTableLand() {

  const tbl = await connect({
    chain: "ethereum-goerli",
    host: "https://testnet.tableland.network"
  });
  window.tbl = tbl;
}

startTableLand();

// initializeWorker();

document.addEventListener("DOMContentLoaded", () => {
  reactDom.createRoot(document.getElementById("app")).render(<Main />);
});
