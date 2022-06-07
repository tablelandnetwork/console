import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';
import GrandCentral from './GrandCentral';

function Main() {
  return (
    <Provider store={store}>
      <GrandCentral />
    </Provider>
  );
}

export default Main;
