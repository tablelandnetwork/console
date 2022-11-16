import React from 'react';
import { WalletConnect } from './Menu_Wallet';
import TransactionList from './TransactionList';

function NavBar() {

  return (
    <ul className='navbar--menu'>
      <WalletConnect />
      <TransactionList />
    </ul>
  );
}

export default NavBar;
