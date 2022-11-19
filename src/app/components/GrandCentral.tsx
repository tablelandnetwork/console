import React from 'react';
import { Routes, Route } from 'react-router';
import Homepage from './pages/Homepage';
import { startTableLand } from '../database/connectToTableland';
import { useAccount, useProvider } from 'wagmi';
import SplashPage from './pages/SplashPage';
import { setConnected } from '../store/walletConnectionSlice';
import { useDispatch } from 'react-redux';

function GrandCentral() {

  const { isConnected } = useAccount();
  const prov = useProvider();

  const dispatch = useDispatch();
  startTableLand(prov).then(r => {
     dispatch(setConnected(true));
  });
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
