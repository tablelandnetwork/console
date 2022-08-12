import React from 'react';
import reactDom from 'react-dom/client';
import { connect } from '@tableland/sdk';
import TablePage from './components/pages/TablePage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';


async function startTableLand() {

  // XXX: Destroy this trash. Global things are lame
  const tbl = await connect({
    chain: "ethereum-goerli"
  });
  window.tbl = tbl;  
  
}

startTableLand();


document.addEventListener("DOMContentLoaded", () => {
  reactDom.createRoot(document.getElementById("app")).render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<TablePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
});
