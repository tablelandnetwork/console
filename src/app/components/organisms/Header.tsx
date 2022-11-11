import React from 'react';
import Logo from '../atoms/Logo';
import NavBar from '../molecules/Menu_Navbar';

function Header(props) {

  return (
    <header className={`navbar ${props.className}`}>       
      <Logo />
      <NavBar />
    </header>
  );  
}
export default Header;
