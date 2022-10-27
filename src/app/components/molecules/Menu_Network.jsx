import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { globalWeb3modal } from './Menu_Wallet';
import { toggleMenu } from '../../store/pageStateSlice';
import { useRef } from 'react';
import { useCloseOnClickOutside } from '../../hooks/clickOutside';
import { getActiveNetworks } from '../../database/connectToTableland';
import { getChainWalletDetails } from '../../database/chains';


export async function SelectChain(chainId) {
  let prov = await globalWeb3modal.connect();

  try {
    await prov.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });

  } catch(e) {

    await prov.request({
      method: 'wallet_addEthereumChain',
      params: [getChainWalletDetails(chainId)]
    });
    await prov.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  }
}

function SupportedChainButton(props) {
  
  async function EmitSwtichEvent(e) {
    e.preventDefault();
    SelectChain(props.chain.chainId);
  }

  const chainKey = `${props.chain.slug}`;

  return (
    <li key={chainKey}>
      <button onClick={ EmitSwtichEvent }>
        {props.chain.phrase}
      </button>
    </li>
  );
}

function SupportedChainList() {
  const chainMenuOpen = useSelector(store => store.pageState.chainMenu);
  const ref = useRef();
  useCloseOnClickOutside(ref, "chainMenu");

  const networks = getActiveNetworks();

  return (
    <ul ref={ref} className={`submenu ${chainMenuOpen ? 'open' : 'closed'}`}>
      {networks.map((chain, key) => {
        return <SupportedChainButton chain={chain} key={chain.slug} />
      })}
    </ul>
  )
}

function NetworkSummaryMenu() {

  const currentNetwork = useSelector(store => store.walletConnection.network);  
  const dispatch = useDispatch();  
  
  if(!currentNetwork) return null;

  function togglesMenu() {
    dispatch(toggleMenu("chainMenu")) 
  }

  return (
    <li>
      <button onClick={togglesMenu}>{currentNetwork}</button>      
      <SupportedChainList />
    </li>    
  );
}

export default NetworkSummaryMenu;
