import { connect, SUPPORTED_CHAINS } from '@tableland/sdk';
import store from '../store/store';
import { networkSet } from '../store/walletConnectionSlice';

export async function startTableLand(provider) {

  const supportedChains = Object.entries(SUPPORTED_CHAINS);

  let currentChain = supportedChains.find(chain => chain[1].chainId === parseInt(provider.chainId));
  
  store.dispatch(networkSet(currentChain[1].phrase));
  
  const tbl = await connect({
    chain: currentChain[0],
    host: "https://testnet.tableland.network"
  });
  window.tbl = tbl;
  
  return tbl;
}
