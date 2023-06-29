import React from "react";
import Header from "../organisms/Header";
import CustomConnectButton from "../atoms/CustomConnectButton";

function SplashPage(props: any): React.JSX.Element {
  return (
    <>
      <Header className="splash-page-header" />
      <div className="splash-page-connecter">
        <h1>Build on Tableland</h1>
        <p className="content">
          Login with your Ethereum wallet to access the Tableland database admin
          dashboard. Create, insert, and modify data using one of the supported
          blockchains or read data from any table on the network.
        </p>
        <CustomConnectButton />
      </div>
    </>
  );
}
export default SplashPage;
