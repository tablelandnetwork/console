import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store/store';
import GrandCentral from './GrandCentral';


function Main() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GrandCentral />
      </BrowserRouter>
    </Provider>
  );
}

export default Main;
