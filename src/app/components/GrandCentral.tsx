import React from 'react';
import { Routes, Route } from 'react-router';
import Homepage from './pages/Homepage';
import { startTableLand } from '../database/connectToTableland';
import { useAccount, useNetwork, useSigner } from 'wagmi';
import SplashPage from './pages/SplashPage';

function GrandCentral() {

  const { isConnected } = useAccount();
  const network = useNetwork();
  const chainId = network?.chain?.id ? network.chain.id : 1;

  const signer = useSigner();
  startTableLand(signer.data, chainId);
  

  

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
