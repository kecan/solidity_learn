import React from 'react'
import { WagmiConfig } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'
import config from './config/wagmi'
import RedPacketDApp from './components/RedPacketDApp'

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider 
          theme="auto"
          options={{
            embedGoogleFonts: true,
            hideBalance: false,
            hideTooltips: false,
            hideQuestionMarkCTA: false,
            hideNoWalletCTA: false,
            walletConnectCTA: "both",
            enforceSupportedChains: true,
            language: "zh-CN",
          }}
        >
          <div className="container">
            <div className="header">
              <h1>🧧 红包 DApp</h1>
              <p>基于区块链的去中心化红包系统 - React 版本</p>
            </div>
            <RedPacketDApp />
          </div>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  )
}

export default App