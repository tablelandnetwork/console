import React from 'react';

import NetworkSummaryMenu from './Menu_Network';
import SettingsMenu from './Menu_Settings';
import { WalletConnect } from './Menu_Wallet';

function NavBar(props) {

  return (
    <ul className='navbar--menu'>
        <WalletConnect />

      <NetworkSummaryMenu />
      <SettingsMenu />
    </ul>
  );
}
export default NavBar;
