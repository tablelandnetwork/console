import { ConnectButton } from '@rainbow-me/rainbowkit';
export let globalWeb3modal = null; 
import { useProvider } from "wagmi";

export function WalletConnect() {
  const provider = useProvider();
  provider.on('chainChanged', () => {
    console.log("Chain Changed");
    location.reload();
  });
  provider.on('accountsChanged', () => {
    console.log("Account changed");
    location.reload();
  });
  console.log("rpov", provider);

  return (
    <li>
      <ConnectButton />
    </li>
  );
}
