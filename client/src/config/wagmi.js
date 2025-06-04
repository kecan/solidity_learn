import { createConfig, http } from 'wagmi'
import { hardhat, localhost } from 'wagmi/chains'
import { getDefaultConfig } from 'connectkit'

// 定义本地链配置
const localChain = {
  ...localhost,
  id: 1337,
  name: 'Ganache Local',
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
}

const config = getDefaultConfig({
  // 你的 DApp 信息
  appName: "红包 DApp",
  appDescription: "基于区块链的去中心化红包系统",
  appUrl: "http://localhost:3000",
  appIcon: "https://family.co/logo.png",

  // WalletConnect Project ID (可选，用于更好的钱包连接体验)
  walletConnectProjectId: process.env.VITE_WALLETCONNECT_PROJECT_ID || '',

  // 支持的链
  chains: [localChain, hardhat],
  
  // 传输配置
  transports: {
    [localChain.id]: http('http://127.0.0.1:8545'),
    [hardhat.id]: http('http://127.0.0.1:8545'),
  },
})

export default config