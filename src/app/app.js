import React from 'react';
import reactDom from 'react-dom/client';
import Main from './components/Main.jsx';
import init from '@tableland/sqlparser';

init();

document.addEventListener("DOMContentLoaded", () => {
  reactDom
    .createRoot(document.getElementById("app"))
    .render(<Main />);
});

// APP WIDE TODOS
// TODO: Refactor slices to be more readable
