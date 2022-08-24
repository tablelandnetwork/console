import React from 'react';
import { Link } from 'react-router-dom';

function Logo(props) {

  return (
    <Link to="/">
      <svg className="navbar--logo navbar--logo__mobile" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg" height="50px" width="50px">
        <path xmlns="http://www.w3.org/2000/svg" d="M 69.274 106.812 C 69.813 104.182 72.154 102.18 74.911 102.18 L 97.728 102.18 C 100.776 102.18 102.135 100.809 103.947 98.147 L 114.004 79.76 C 114.951 78.029 116.802 76.946 118.821 76.946 L 202.778 76.946 C 204.941 76.946 206.738 78.567 206.912 80.658 C 210.289 121.423 214.571 149.054 241.679 174.064 C 244.521 176.689 242.703 181.621 238.779 181.621 L 40.047 181.621 C 36.115 181.621 34.292 176.676 37.142 174.049 C 56.547 156.142 64.321 136.552 68.427 111.198 C 68.633 109.926 68.884 108.706 69.136 107.481 C 69.182 107.258 69.228 107.034 69.274 106.812 Z" style={{"fillOpacity": 0.2,  "fill": "black"}} />
      </svg>
      <img src="./assets/tableland-dashboard.svg" className='navbar--logo' />
    </Link>
  );
}
export default Logo;
