// 合约地址 - 部署后需要更新
export const CONTRACT_ADDRESS = '0x...'; // 替换为实际部署的合约地址

// 合约 ABI
export const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "_count", "type": "uint256"},
      {"internalType": "string", "name": "_message", "type": "string"}
    ],
    "name": "createRedPacket",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_redPacketId", "type": "uint256"}],
    "name": "claimRedPacket",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_redPacketId", "type": "uint256"}],
    "name": "getRedPacketInfo",
    "outputs": [
      {"internalType": "address", "name": "creator", "type": "address"},
      {"internalType": "uint256", "name": "totalAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "remainingAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "totalCount", "type": "uint256"},
      {"internalType": "uint256", "name": "remainingCount", "type": "uint256"},
      {"internalType": "string", "name": "message", "type": "string"},
      {"internalType": "bool", "name": "isActive", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_redPacketId", "type": "uint256"},
      {"internalType": "address", "name": "_user", "type": "address"}
    ],
    "name": "hasClaimedRedPacket",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextRedPacketId",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "redPacketId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "creator", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "totalAmount", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "totalCount", "type": "uint256"},
      {"indexed": false, "internalType": "string", "name": "message", "type": "string"}
    ],
    "name": "RedPacketCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "redPacketId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "claimer", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "RedPacketClaimed",
    "type": "event"
  }
];