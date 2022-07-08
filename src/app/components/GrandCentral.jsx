import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Homepage from './pages/Homepage';
import AboutPage from './pages/About';
import BrowsePage from './pages/BrowsePage';

function GrandCentral() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/table/:tableId" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default GrandCentral;
