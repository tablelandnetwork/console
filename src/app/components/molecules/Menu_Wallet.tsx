import React from 'react';
export let globalWeb3modal = null; 
import CustomConnectButton from '../atoms/CustomConnectButton';

export function WalletConnect() {
  
  return (
    <li>
      <CustomConnectButton />
    </li>
  );
}
