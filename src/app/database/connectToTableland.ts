import { connect, SUPPORTED_CHAINS } from '@tableland/sdk';
import { ChainName } from '@tableland/sdk';
import store from '../store/store';
import { networkSet } from '../store/walletConnectionSlice';
const supportedChains = Object.entries(SUPPORTED_CHAINS);

// TODO: Turn tableland connection into hook


var tablelandConnection = connect({
  host: localStorage.getItem("validator") || "https://testnet.tableland.network"
});

export function getTablelandConnection() {
  return tablelandConnection;
}

export function startTableLand(chainId) {


  const supportedChains = Object.entries(SUPPORTED_CHAINS);

  let currentChain = supportedChains.find(chain => chain[1].chainId === chainId);
  
  // @ts-ignore
  store.dispatch(networkSet(currentChain[1].phrase) || "Ethereum Mainnet");
  const tbl = connect({
    chain: currentChain[0] as ChainName,
    host: localStorage.getItem("validator") || currentChain[1].host
  });


  tablelandConnection = tbl;
  
  return tbl;
}
