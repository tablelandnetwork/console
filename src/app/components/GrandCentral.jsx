import React from 'react';
import { Routes, Route } from 'react-router';
import Homepage from './pages/Homepage';
import AboutPage from './protoypes/AboutPage';
import NFT from './protoypes/NFT';

function GrandCentral() {

  return (       
    <Routes>
      <Route path="*" element={<Homepage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/nft" element={<NFT />} />
    </Routes>
  );
}

export default GrandCentral;
