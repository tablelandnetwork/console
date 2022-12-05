import React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCloseOnClickOutside } from '../../hooks/clickOutside';
import { toggleMenu } from '../../store/pageStateSlice';
import { RootState } from '../../store/store';
import { Flags } from 'react-feature-flags';

function SettingsMenu() {
  const settingsMenuOpen = useSelector((store: RootState) => store.pageState.settingsMenu);
  const ref = useRef();
  const dispatch = useDispatch();
  useCloseOnClickOutside(ref, "settingsMenu");


  return (
    <Flags authorizedFlags={['customValidator']}>
      <li>
        <button 
          className="button-default"
          onClick={() => dispatch(toggleMenu("settingsMenu"))}
        >
          <i className="fa-solid fa-ellipsis"></i>
        </button>
        <ul 
          className={`submenu ${settingsMenuOpen ? 'open' : 'closed'}`} 
          ref={ref}
        >  
            <li>

            </li>

        </ul>
      </li>
    </Flags>
  );
}

export default SettingsMenu;
