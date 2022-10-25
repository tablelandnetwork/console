import React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCloseOnClickOutside } from '../../hooks/clickOutside';
import { toggleMenu } from '../../store/pageStateSlice';
import { changeNetworksToShow, changeValidatorHost } from '../../store/walletConnectionSlice';
import { globalWeb3modal } from './Menu_Wallet';  
import { Flags } from 'react-feature-flags';

async function ResetWallet() {
  globalWeb3modal.clearCachedProvider();

  location.reload();
}

function Disconnect() {

  return (
    <li>
      <button 
        className='reset' 
        onClick={ ResetWallet }
      >
        Disconnect <i className="fa-solid fa-link-slash"></i>
      </button>
    </li>
  )
}

function SettingsMenu() {
  const settingsMenuOpen = useSelector(store => store.pageState.settingsMenu);
  const ref = useRef();
  const dispatch = useDispatch();
  useCloseOnClickOutside(ref, "settingsMenu");
  const { networksToShow, customHost } = useSelector(store => store.walletConnection);

  function toggleNetsToShow(set) {
    
    dispatch(changeNetworksToShow(set))
  }

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
        <Disconnect />     
        <li>
          <div>
            <label htmlFor="show-testnets" type="radio">Show Testnets</label>
            <input id="show-testnets" onChange={()=>toggleNetsToShow("testnets")}  type="radio" checked={networksToShow === "testnets"} />  
          </div>
          <div>
            <label htmlFor="show-mainnets" type="radio">Show Mainnets</label>
            <input id="show-mainnets" onChange={()=>toggleNetsToShow("mainnets")}  type="radio" checked={networksToShow === "mainnets"} />  
          </div>
          <div>
            <label htmlFor="show-allnets" type="radio">Show Both</label>
            <input id="show-allnets" onChange={()=>toggleNetsToShow("all")}  type="radio" checked={networksToShow === "all"} />  
          </div>
        </li>   
        <Flags authorizedFlags={['customValidator']}>
          <li>
            <label htmlFor="validatorUrl"></label>
            <input 
              type="text" 
              name="validatorUrl" 
              defaultValue={customHost}
              onKeyUp={e => {
                dispatch(changeValidatorHost(e.target.value));
              }}
            ></input>
            <button onClick={() => {
              localStorage.setItem("validator", customHost);
              location.reload();
            }}>Change Validator</button>
            {customHost && <button onClick={()=> {
              localStorage.setItem("validator", "");
              location.reload();
            }}>Clear Custom Validator</button>}
          </li>
        </Flags>
      </ul>
    </li>
  );
}

export default SettingsMenu;
