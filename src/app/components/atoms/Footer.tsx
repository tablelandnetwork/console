import React from 'react';

function Footer() {

  return (
    <footer>
      <span className='dashboard-version'>
        { // @ts-ignore
          VERSION
        }
      </span> 
    </footer>  
  );
}
export default Footer;
