import { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { queryLocal } from '../../database/databaseCalls';
import populateFromTableland from '../../database/populateFromTableland';
import { refreshTables } from '../../store/tablesSlice';
import { useDispatch } from 'react-redux/es/exports';

export let globalWeb3modal = null; 


export function WalletConnect() {

  const [web3Modal, setWeb3Modal] = useState(null);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const dispatch = useDispatch();


  async function completeConnection(web3Modal) {
    const provider = await web3Modal.connect();
    setAddress((await provider.request({ method: 'eth_accounts' }))[0]);
    setConnected(true);
    dispatch(refreshTables());
    
    provider.on('chainChanged', () => {
      console.log("Chain Changed");
      location.reload();
    });
    provider.on('accountsChanged', () => {
      console.log("Account changed");
      location.reload();
    });
  }

  useEffect(() => {
    
    // initiate web3modal
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "YOUR_INFURA_KEY",
        }
      },
    };

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true, // very important
      network: "mainnet",
      providerOptions,
    });

    globalWeb3modal = newWeb3Modal;
    setWeb3Modal(newWeb3Modal)
    if(newWeb3Modal.cachedProvider) {
      completeConnection(newWeb3Modal);

    }
  }, [])

  async function toggleWallet() {
    if(connected) {
      setConnected(false);
      web3Modal.clearCachedProvider();
      location.reload();
    } else {
      completeConnection(web3Modal);
      queryLocal(await populateFromTableland());
    }

  }

  let truncAddress = `${address.substring(0, 5)}...${address.substring(address.length - 4)}`; 

  return <button onClick={toggleWallet} title={address} >{connected ? <>Connected: <span className='reset-case'>{truncAddress}</span> <span className='connected-icon'>●</span></> : "Connect wallet" }</button>
}
