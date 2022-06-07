import React from 'react';
import reactDom from 'react-dom/client';
import Main from './components/Main.jsx';
import initializeWorker from './database/initializeWorker.js';

initializeWorker();

document.addEventListener("DOMContentLoaded", () => {
  reactDom.createRoot(document.getElementById("app")).render(<Main />);
});
