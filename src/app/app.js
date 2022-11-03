import React from 'react';
import reactDom from 'react-dom/client';
import Main from './components/ContextProviders.tsx';
import init from '@tableland/sqlparser';

init();

document.addEventListener("DOMContentLoaded", () => {
  reactDom
    .createRoot(document.getElementById("app"))
    .render(<Main />);
});

