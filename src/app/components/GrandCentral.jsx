import React from 'react';
import { Routes, Route } from 'react-router';
import Homepage from './pages/Homepage';

function GrandCentral() {

  return (       
    <Routes>
      <Route path="*" element={<Homepage />} />
    </Routes>
  );
}

export default GrandCentral;
