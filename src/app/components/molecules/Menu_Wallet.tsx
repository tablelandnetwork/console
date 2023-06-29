import React from "react";
import CustomConnectButton from "../atoms/CustomConnectButton";
export const globalWeb3modal = null;

export function WalletConnect(): React.JSX.Element {
  return (
    <li>
      <CustomConnectButton />
    </li>
  );
}
