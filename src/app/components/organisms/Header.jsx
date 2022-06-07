import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {

  return (
    <header>
    Tableland
    - 
    <Link to="/about">About</Link>
    <button>Connect to Tableland</button>
  </header>
  );
}
export default Header;
