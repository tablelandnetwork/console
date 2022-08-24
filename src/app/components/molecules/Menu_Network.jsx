import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { globalWeb3modal } from './Menu_Wallet';
import { SUPPORTED_CHAINS } from '@tableland/sdk';
import PendingWrites from './PendingWrites';


function NetworkSummaryMenu() {
  const [chainMenuOpen, setChainMenuOpen] = useState();
  const currentNetwork = useSelector(store => store.walletConnection.network);
  const supportedChains = Object.entries(SUPPORTED_CHAINS);
  const pendingWrites = useSelector(store => store.pendingWrites);

  if(!currentNetwork) return null;

  return (
    <li>
      <button onClick={() => setChainMenuOpen(!chainMenuOpen) }>{currentNetwork}</button>
      {
        pendingWrites.filter(write => write.status!=='complete').length ? (
          <>
            <button>Writes pedning: {pendingWrites.length} <i className="fas fa-circle-notch fa-spin"></i></button>
            <ul>
              <PendingWrites />
            </ul>
          </>
        ) : null
      }
      
      <ul className={`submenu ${chainMenuOpen ? 'open' : 'closed'}`}>
        {supportedChains.map((chain, key) => {
          return <li key={`${chain[1].chainId}-${key}`}><button onClick={async e => {
            e.preventDefault();
            let prov = await globalWeb3modal.connect();

            prov.request({
              method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${chain[1].chainId.toString(16)}` }],
            });
          }}>{chain[1].phrase}</button></li>
        })}
      </ul>
    </li>    
    );
}

export default NetworkSummaryMenu;
