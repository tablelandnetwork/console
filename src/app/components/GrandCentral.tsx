import React from 'react';
import { Routes, Route } from 'react-router';
import Homepage from './pages/Homepage';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { startTableLand } from '../database/connectToTableland';
import { useAccount, useProvider } from 'wagmi';

function SplashScreen(props) {
  return (
    <ConnectButton />
  );
}

function GrandCentral() {

  const { address, isConnected } = useAccount();
  const prov = useProvider();
  startTableLand(prov);
  if(!isConnected) {
    return <SplashScreen />
  }

  return (       
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default GrandCentral;
