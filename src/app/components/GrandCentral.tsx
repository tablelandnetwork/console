import React from "react";
import { Routes, Route } from "react-router";
import { useAccount, useNetwork } from "wagmi";
import { useSigner } from "../hooks/useSigner";
import { startTableLand } from "../database/connectToTableland";
import Homepage from "./pages/Homepage";
import SplashPage from "./pages/SplashPage";

function GrandCentral(): React.JSX.Element {
  const { isConnected } = useAccount();
  const network = useNetwork();
  const chainId = network?.chain?.id ? network.chain.id : 1;
  const signer = useSigner() as any;

  startTableLand(signer, chainId);

  if (!isConnected) {
    return <SplashPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default GrandCentral;
