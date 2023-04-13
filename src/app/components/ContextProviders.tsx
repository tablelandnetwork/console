import * as React from 'react';
import { FlagsProvider } from 'react-feature-flags';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store/store';
import GrandCentral from './GrandCentral';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  Chain
} from '@rainbow-me/rainbowkit';
import {
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import * as chain from 'wagmi/chains';


const localTableland: Chain = {
  id: 31337,
  name: 'Local Tableland',
  network: 'local-tableland',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'LocalTableland',
    symbol: 'LCTBL',
  },
  rpcUrls: {
    default:  {
      http: ["localhost:8080"]      
    },
    public:  {
      http: ["localhost:8080"]      
    },
  },
  // blockExplorers: {
  //   default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  //   etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  // },
  testnet: true,
};


const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.arbitrumGoerli, chain.goerli, chain.polygonMumbai, chain.optimismGoerli, localTableland],
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
