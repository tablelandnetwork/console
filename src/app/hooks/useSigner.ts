import * as React from "react";
import { type WalletClient, useWalletClient } from "wagmi";
import { providers, type Signer } from "ethers";

function walletClientToSigner(walletClient: WalletClient): Signer {
  const { account, chain } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const rpcUrl = chain.rpcUrls.default.http[0];
  const provider = new providers.JsonRpcProvider(rpcUrl, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

export function useSigner({ chainId }: { chainId?: number } = {}):
  | Signer
  | undefined {
  const { data: walletClient } = useWalletClient({ chainId });
  return React.useMemo(
    () => (walletClient ? walletClientToSigner(walletClient) : undefined),
    [walletClient]
  );
}
