import React from 'react';

import NetworkSummaryMenu from './Menu_Network';
import SettingsMenu from './Menu_Settings';
import { WalletConnect } from './Menu_Wallet';
import TransactionList from './TransactionList';

function NavBar() {

  return (
    <ul className='navbar--menu'>
      <WalletConnect />
      <TransactionList />
      <NetworkSummaryMenu />
      <SettingsMenu />
    </ul>
  );
}

export default NavBar;
