import React from 'react';
import { Link } from 'react-router-dom';


function EmptyHeader(props) {

  return (
    <header className='navbar'>
    <Link to="/">  
      <img src="./assets/tableland.svg" className='navbar--logo' />
    </Link>
    <ul className='navbar--menu'>
      <li><a href="#"><i class="fa-solid fa-ellipsis-vertical"></i></a></li>
      <li><a target="_blank" href="https://dash.tableland.xyz"><i className="fa-solid fa-arrow-up-right-from-square"></i></a></li>
    </ul>
  </header>
  );
}
export default EmptyHeader;
