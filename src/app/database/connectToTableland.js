import { connect, SUPPORTED_CHAINS } from '@tableland/sdk';
import store from '../store/store';
import { networkSet } from '../store/walletConnectionSlice';
const supportedChains = Object.entries(SUPPORTED_CHAINS);

export function getActiveNetworks() {
  const { networksToShow } = store.getState().walletConnection;  

  let activeChains = supportedChains.map(chain => {
    return {
      slug: chain[0],
      ...chain[1]
    }
  })


  
  activeChains = activeChains.filter(chain => {
    if(networksToShow==="mainnets" || networksToShow==="all") return true;
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
    if(networksToShow==="testnets" || networksToShow==="all") return true;
    if(chain.host.includes("staging")) return false;
    if(chain.chainId===31337) return false;
    return true;
  });

  return activeChains;
}

var tablelandConnection = connect({
  chain: 'ethereum-goerli',
  host: localStorage.getItem("validator") || "https://testnet.tableland.network"
});

export function getTablelandConnection() {
  return tablelandConnection;
}

export async function startTableLand(provider) {

  const supportedChains = Object.entries(SUPPORTED_CHAINS);

  let currentChain = supportedChains.find(chain => chain[1].chainId === parseInt(provider.chainId));
  

  store.dispatch(networkSet(currentChain[1].phrase) || "Ethereum Mainnet");
  
  const tbl = await connect({
    chain: currentChain[0],
    host: localStorage.getItem("validator") || currentChain[1].host
  });

  tablelandConnection = tbl;
  
  return tbl;
}
