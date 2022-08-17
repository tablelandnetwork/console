import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Homepage from './pages/Homepage';
import AboutPage from './pages/AboutPage';
import CreateTable from './pages/CreateTablePage';
import TablePage from './pages/TablePage';

function GrandCentral() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/table/:tableId" element={<AboutPage />} />
        <Route path="/table" element={<TablePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default GrandCentral;
