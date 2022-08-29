import React from 'react';
import { Routes, Route } from 'react-router';
import Homepage from './pages/Homepage';
import AboutPage from './pages/AboutPage';
import TablePage from './protoypes/NFT';

function GrandCentral() {


  return (       
    <Routes>
      <Route path="*" element={<Homepage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/table/:tableId" element={<AboutPage />} />
      <Route path="/table" element={<TablePage />} />
    </Routes>
  );
}

export default GrandCentral;
