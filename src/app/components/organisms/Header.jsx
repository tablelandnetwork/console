import React from 'react';
import { Link } from 'react-router-dom';
import { GENERIC_QUERY } from '../../../consts';
import { genericQuery } from '../../database/databaseCalls';
import populateFromTableland from '../../database/populateFromTableland';

function Header(props) {

  return (
    <header className='navbar'>
    <Link to="/">  
      <img src="./assets/tableland.svg" className='navbar--logo' />
    </Link>
    <ul className='navbar--menu'>
      <li><Link to="/about">About</Link></li>
      {/* <li>
      <button className='subtle'>Upload Database (sqlite)</button>
      </li> */}
      <li>
        <button onClick={async e => {
          genericQuery(await populateFromTableland());
        }} >Connect to Tableland</button>
      </li>
    </ul>
  </header>
  );
}
export default Header;
