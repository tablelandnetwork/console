import React from 'react';
import { FlagsProvider } from 'react-feature-flags';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store/store';
import GrandCentral from './GrandCentral';


function Main() {
  return (
    <Provider store={store}>
      <FlagsProvider value={[{name: "savedQueries", isActive: false}]}>
        <BrowserRouter>
          <GrandCentral />
        </BrowserRouter>
      </FlagsProvider>
    </Provider>
  );
}

export default Main;
