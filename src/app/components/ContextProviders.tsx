import * as React from 'react';
import { FlagsProvider } from 'react-feature-flags';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store/store';
import GrandCentral from './GrandCentral';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';


const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.arbitrumGoerli, chain.goerli],
  [
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Tableland Dashboard',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

function Main() { 
  
  return (
    <Provider store={store}>
      <FlagsProvider value={store.getState().flags}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider theme={darkTheme()} chains={chains}>
            <BrowserRouter>
              <GrandCentral />
            </BrowserRouter>
          </RainbowKitProvider>
        </WagmiConfig>
      </FlagsProvider>
    </Provider>
  );
}

export default Main;
