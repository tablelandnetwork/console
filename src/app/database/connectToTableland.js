import { connect, SUPPORTED_CHAINS } from '@tableland/sdk';
import store from '../store/store';
import { networkSet } from '../store/walletConnectionSlice';
const supportedChains = Object.entries(SUPPORTED_CHAINS);

export function getActiveNetworks() {
  const { showMainnets, showStaging } = store.getState().walletConnection;  

  let activeChains = supportedChains.map(chain => {
    return {
      slug: chain[0],
      ...chain[1]
    }
  })


  
  activeChains = activeChains.filter(chain => {
    if(showMainnets) return true;
    switch(chain.chainId) {
      case 1:
      case 10:
      case 137:
        return false;
      default:
        return true;
    }
  });

  activeChains = activeChains.filter(chain => {
    if(showStaging) return true;
    if(chain.host.includes("staging")) return false;
    return true;
  });

  activeChains = activeChains.filter(chain => chain.name !== "localhost");

  return activeChains;
}

window.filt = getActiveNetworks;

export async function startTableLand(provider) {

  const supportedChains = Object.entries(SUPPORTED_CHAINS);

  let currentChain = supportedChains.find(chain => chain[1].chainId === parseInt(provider.chainId));
  
  store.dispatch(networkSet(currentChain[1].phrase));
  
  const tbl = await connect({
    chain: currentChain[0],
    host: currentChain[1].host
  });
  window.tbl = tbl;
  
  return tbl;
}
