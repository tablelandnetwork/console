import React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCloseOnClickOutside } from '../../hooks/clickOutside';
import { toggleMenu } from '../../store/pageStateSlice';
import { globalWeb3modal } from './Menu_Wallet';  

function ResetWallet() {
  () => {
    globalWeb3modal.clearCachedProvider();
    location.reload();
  }
}

function SettingsMenu() {
  const settingsMenuOpen = useSelector(store => store.pageState.settingsMenu);
  const ref = useRef();
  const dispatch = useDispatch();
  useCloseOnClickOutside(ref, "settingsMenu");

  return (
    <li>
      <button 
        onClick={() => dispatch(toggleMenu("settingsMenu"))}
      >
        <i className="fa-solid fa-ellipsis"></i>
      </button>
      <ul 
        className={`submenu ${settingsMenuOpen ? 'open' : 'closed'}`} 
        ref={ref}
      >
        <li>
          <button 
            className='reset' 
            onClick={ ResetWallet }
          >
            Disconnect <i className="fa-solid fa-link-slash"></i>
          </button>
        </li>        
      </ul>
    </li>
  );
}
export default SettingsMenu;
