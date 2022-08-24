import React, { useState } from 'react';
import { globalWeb3modal } from './Menu_Wallet';  

function SettingsMenu() {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState();
  return (
    <li>
      <button onClick={() => setSettingsMenuOpen(!settingsMenuOpen)}><i className="fa-solid fa-ellipsis"></i></button>
      <ul className={`submenu ${settingsMenuOpen ? 'open' : 'closed'}`}>
        <li><button className='reset' onClick={()=>{
          globalWeb3modal.clearCachedProvider();
          location.reload();
        }}>Disconnect <i className="fa-solid fa-link-slash"></i></button></li>
        
      </ul>
    </li>
  );
}
export default SettingsMenu;
