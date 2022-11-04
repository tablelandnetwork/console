import React from 'react';
import Header from '../organisms/Header';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import CustomConnectButton from '../atoms/CustomConnectButton';

function SplashPage(props) {

  return (
    <>
      <Header />
      <div className='splash-page-connecter'>
        <CustomConnectButton />
      </div>
    </>
  );
}
export default SplashPage;
