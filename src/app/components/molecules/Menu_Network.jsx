import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalWeb3modal } from './Menu_Wallet';
import { SUPPORTED_CHAINS } from '@tableland/sdk';
import { toggleMenu } from '../../store/pageStateSlice';
import { useRef } from 'react';
import { useCloseOnClickOutside } from '../../hooks/clickOutside';

function NetworkSummaryMenu() {
  const chainMenuOpen = useSelector(store => store.pageState.chainMenu);
  const currentNetwork = useSelector(store => store.walletConnection.network);
  const supportedChains = Object.entries(SUPPORTED_CHAINS);
  const dispatch = useDispatch();
  const ref = useRef();
  useCloseOnClickOutside(ref, "chainMenu");
  if(!currentNetwork) return null;

  function menuToggles() {
    dispatch(toggleMenu("chainMenu")) 
  }

  return (
    <li>
      <button onClick={menuToggles}>{currentNetwork}</button>      
      
      <ul ref={ref} className={`submenu ${chainMenuOpen ? 'open' : 'closed'}`}>
        {supportedChains.map((chain, key) => {
          // TODO: Clean this up
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
