import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { globalWeb3modal } from './Menu_Wallet';
import { SUPPORTED_CHAINS } from '@tableland/sdk';
import PendingWrites from './PendingWrites';

function PendingTransactionList() {
  const pendingWrites = useSelector(store => store.pendingWrites);
  if(pendingWrites.length < 1) return null;

  let awaitingWallet = !!pendingWrites.filter(write => write.status==='pending-wallet').length;
  let pending = pendingWrites.filter(write => write.status!=='complete').length;
  let icon = awaitingWallet ? <i className="fa-solid fa-circle-exclamation" title="Awaiting Wallet"></i> : <i className="fas fa-circle-notch fa-spin"></i>;
  if(!pending) {
    icon = <i className="fa-solid fa-check"></i>;
  }
  return (
    <>
      <button>Commits {!pending ? "Complete" : "Pending"}: {pending || pendingWrites.length}/{pendingWrites.length} {icon}</button>
      <PendingWrites />
    </>
  )

}


function NetworkSummaryMenu() {
  const [chainMenuOpen, setChainMenuOpen] = useState();
  const currentNetwork = useSelector(store => store.walletConnection.network);
  const supportedChains = Object.entries(SUPPORTED_CHAINS);
  

  if(!currentNetwork) return null;

  return (
    <li>
      <button onClick={() => setChainMenuOpen(!chainMenuOpen) }>{currentNetwork}</button>
      <PendingTransactionList />
      
      <ul className={`submenu ${chainMenuOpen ? 'open' : 'closed'}`}>
        {supportedChains.map((chain, key) => {
          // TODO: Remove this
          if(chain[1].host==="https://staging.tableland.network") return null;
          if(chain[1].chainId!==5 && chain[1].chainId!==69) return null;
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
