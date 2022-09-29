// interface ChainDetails {
//   chainId: number | string,
//   chainName: string,
//   nativeCurrency: {
//     name: string,
//     symbol: string,
//     decimals: number
//   },
//   rpcUrls: string[]
// };

export const chainWalletRegisterList = [
  {
    chainId: 421613,
    chainName: "Arbitrum Görli",
    nativeCurrency: {
      name: "Arbitrum Görli",
      symbol: "AGOR",
      decimals: 18,
    },
    rpcUrls: ["https://goerli-rollup.arbitrum.io/rpc"]
  },
  {
    chainId: 69,
    chainName: "Optimism Kovan",
    nativeCurrency: {
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://kovan.optimism.io/"]
  },
  {
    chainId: 420,
    chainName: "Optimism Goerli Testnet",
    nativeCurrency: {
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://goerli.optimism.io/"]
  },
  {
    chainId: 10,
    chainName: "Optimism",
    nativeCurrency: {
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.optimism.io/"]
  },
  {
    chainId: 421613,
    chainName: "Arbitrum Görli",
    nativeCurrency: {
      symbol: "AGOR",
      decimals: 18,
    },
    rpcUrls: ["https://goerli-rollup.arbitrum.io/rpc/"]
  },
  {
    chainId: 80001,
    chainName: "Mumbai",
    nativeCurrency: {
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com"]
  },
  {
    chainId: 137,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"]
  },
  {
    chainId: 31337,
    chainName: "Local Tableland",
    nativeCurrency: {
      symbol: "fETH",
      decimals: 18,
    },
    rpcUrls: ["http://localhost:8545"]
  }  
];

export function getChainWalletDetails(chainId) {

  const chain = chainWalletRegisterList.find(chain => chain.chainId === chainId);
  chain.chainId = `0x${chainId.toString(16)}`;

  return chain;
}
