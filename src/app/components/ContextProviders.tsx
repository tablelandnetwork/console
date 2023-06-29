import * as React from "react";
import { FlagsProvider } from "react-feature-flags";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import * as chain from "wagmi/chains";
import store from "../store/store";
import GrandCentral from "./GrandCentral";

const { chains, publicClient } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    chain.arbitrumGoerli,
    chain.sepolia,
    chain.polygonMumbai,
    chain.optimismGoerli,
    chain.filecoinCalibration,
    chain.hardhat,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Tableland Dashboard",
  chains,
  projectId: process.env.REACT_APP_WALLET_CONNECT_API_KEY ?? "",
});

const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function Main(): React.JSX.Element {
  return (
    <Provider store={store}>
      <FlagsProvider value={store.getState().flags}>
        <WagmiConfig config={wagmiClient}>
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
