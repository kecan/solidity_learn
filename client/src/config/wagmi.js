import { createConfig, configureChains } from 'wagmi'
import { localhost } from 'wagmi/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { getDefaultConfig } from 'connectkit'

// 定义本地链配置
const localChain = {
  ...localhost,
  id: 1337,
  name: 'Ganache Local',
  network: 'ganache',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [localChain],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: 'http://127.0.0.1:8545',
      }),
    }),
  ]
)

const config = getDefaultConfig({
  // 你的 DApp 信息
  appName: "红包 DApp",
  appDescription: "基于区块链的去中心化红包系统",
  appUrl: "http://localhost:3000",
  appIcon: "https://family.co/logo.png",

  // WalletConnect Project ID (可选)
  walletConnectProjectId: process.env.VITE_WALLETCONNECT_PROJECT_ID || '',

  // 支持的链
  chains,
  publicClient,
  webSocketPublicClient,
})

export default config