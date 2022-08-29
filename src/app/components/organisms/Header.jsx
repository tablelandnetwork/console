import React from 'react';
import Logo from '../atoms/Logo';
import NavBar from '../molecules/Menu_Navbar';

function Header() {

  return (
    <header className='navbar'>       
      <Logo />
      <NavBar />
    </header>
  );  
}
export default Header;
