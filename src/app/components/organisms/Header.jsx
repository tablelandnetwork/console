import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { globalWeb3modal, WalletConnect } from '../molecules/WalletConnect';
import { SUPPORTED_CHAINS } from '@tableland/sdk';
import Logo from '../atoms/Logo';
// TODO: Refactor into smaller components

function Header(props) {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState();
  const [chainMenuOpen, setChainMenuOpen] = useState();
  const currentNetwork = useSelector(store => store.walletConnection.network);
  const supportedChains = Object.entries(SUPPORTED_CHAINS);
  const pendingWrites = useSelector(store => store.pendingWrites);

  return (
    <header className='navbar'>
    <Link to="/">  
      <Logo />
    </Link>
    <ul className='navbar--menu'>
      <li>
        <WalletConnect />
      </li>
      {currentNetwork ? (
      <li>
        <button onClick={() => setChainMenuOpen(!chainMenuOpen) }>{currentNetwork}</button>
        {
          pendingWrites.filter(write => write.status!=='complete').length ? (
            <button>Writes pedning: {pendingWrites.length} <i className="fas fa-circle-notch fa-spin"></i></button>
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
      ) : null}
      <li>
        <button onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}><i className="fa-solid fa-ellipsis"></i></button>
        <ul className={`submenu ${settingsMenuOpen ? 'open' : 'closed'}`}>
          {/* <li><Link to="/about"> About <i className="fa-solid fa-circle-info"></i></Link></li> */}
          <li><button className='reset' onClick={()=>{
            globalWeb3modal.clearCachedProvider();
            location.reload();
          }}>Disconnect <i className="fa-solid fa-link-slash"></i></button></li>
          
        </ul>
      </li>
    </ul>
  </header>
  );
  
}
export default Header;
