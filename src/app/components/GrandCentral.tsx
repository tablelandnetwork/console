import React from 'react';
import { Routes, Route } from 'react-router';
import Homepage from './pages/Homepage';

import { startTableLand } from '../database/connectToTableland';
import { useAccount, useProvider } from 'wagmi';
import SplashPage from './pages/SplashPage';


function GrandCentral() {

  const { address, isConnected } = useAccount();
  const prov = useProvider();
  startTableLand(prov);
  if(!isConnected) {
    return <SplashPage />
  }

  return (       
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default GrandCentral;
