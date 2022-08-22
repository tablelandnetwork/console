import React from 'react';
import reactDom from 'react-dom/client';
import Main from './components/Main.jsx';
import { connect } from '@tableland/sdk';



import init from '@tableland/sqlparser';
init();

const tbl =  connect({
  chain: 'ethereum-goerli',
  host: "https://testnet.tableland.network"
});
window.tbl = tbl;

document.addEventListener("DOMContentLoaded", () => {
  reactDom.createRoot(document.getElementById("app")).render(<Main />);
});
