import React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCloseOnClickOutside } from '../../hooks/clickOutside';
import { toggleMenu } from '../../store/pageStateSlice';
import { setShowMainnets, setShowStaging } from '../../store/walletConnectionSlice';
import { globalWeb3modal } from './Menu_Wallet';  

async function ResetWallet() {
  globalWeb3modal.clearCachedProvider();
  // await globalWeb3modal.connect().request({
  //   method: "eth_requestAccounts",
  //   params: [{eth_accounts: {}}]
  // });
  location.reload();
}

function Disconnect() {

  const network = useSelector(store => store.walletConnection.network);
  if(!network) return null;

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
  const { showMainnets, showStaging } = useSelector(store => store.walletConnection);

  function toggleShowMainnet() {
    dispatch(setShowMainnets(!showMainnets))
  }
  
  function toggleShowStaging() {
    dispatch(setShowStaging(!showStaging))
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
          <label htmlFor="show-testnets">Show Mainnets (alpha)</label>
          <input id="show-testnets" onChange={toggleShowMainnet}  type="checkbox" checked={showMainnets} />  
        </li>   
        {/* <li>
          <button>
            <label htmlFor="show-testnets" >Show Tableland Staging <i className="fa-solid fa-circle-question tooltip"><span>For Tableland Devs, mostly</span></i></label>
            <input id="show-staging" onChange={toggleShowStaging}  type="checkbox" checked={showStaging} />
          </button>
        </li> */}
      </ul>
    </li>
  );
}
export default SettingsMenu;
