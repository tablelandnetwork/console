import React from 'react';
import Header from '../organisms/Header';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CustomConnectButton from '../atoms/CustomConnectButton';

function SplashPage(props) {

  return (
    <>
      <Header />
      <div className='splash-page-connecter'>
        <div style={{ "height": "100vh", "width": "100vw", display: "flex", "justifyContent": "center", "alignItems": "center"}} >
          <CustomConnectButton />
        </div>
      </div>
    </>
  );
}
export default SplashPage;
