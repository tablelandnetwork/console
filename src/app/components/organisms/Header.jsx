import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { globalWeb3modal, WalletConnect } from '../molecules/WalletConnect';


function Header(props) {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState();

  return (
    <header className='navbar'>
    <Link to="/">  
    {/* <svg class="navbar--logo" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg" height="50px" width="50px">
      <path xmlns="http://www.w3.org/2000/svg" d="M 69.274 106.812 C 69.813 104.182 72.154 102.18 74.911 102.18 L 97.728 102.18 C 100.776 102.18 102.135 100.809 103.947 98.147 L 114.004 79.76 C 114.951 78.029 116.802 76.946 118.821 76.946 L 202.778 76.946 C 204.941 76.946 206.738 78.567 206.912 80.658 C 210.289 121.423 214.571 149.054 241.679 174.064 C 244.521 176.689 242.703 181.621 238.779 181.621 L 40.047 181.621 C 36.115 181.621 34.292 176.676 37.142 174.049 C 56.547 156.142 64.321 136.552 68.427 111.198 C 68.633 109.926 68.884 108.706 69.136 107.481 C 69.182 107.258 69.228 107.034 69.274 106.812 Z" style={{"fill-opacity": 0.2,  "fill": "black"}} />
    </svg> */}

      <img src="./assets/tableland.svg" className='navbar--logo' />
    </Link>
    <ul className='navbar--menu'>
      {/* <li><Link to="/about">About</Link></li> */}
      <li>
        <WalletConnect />
      </li>
      <li>
        <button onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}><i className="fa-solid fa-ellipsis"></i></button>
        <ul className={`submenu ${settingsMenuOpen ? 'open' : 'closed'}`}>
          <li><Link to="/about"> About <i className="fa-solid fa-circle-info"></i></Link></li>
          <li><button className='reset' onClick={()=>{
            globalWeb3modal.clearCachedProvider();
            location.reload();
          }}>Disconnect <i className="fa-solid fa-link-slash"></i></button></li>
        </ul>
      </li>
    </ul>
  </header>
  );
  
}
export default Header;
