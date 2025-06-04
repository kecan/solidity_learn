# 部署和使用指南

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/kecan/solidity_learn.git
cd solidity_learn
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动本地区块链

在新的终端窗口中运行：

```bash
npm run ganache
```

这将启动一个本地的以太坊测试网络，默认端口为 8545。

### 4. 编译智能合约

```bash
npm run compile
```

### 5. 部署智能合约

```bash
npm run migrate
```

部署成功后，你会看到类似的输出：
```
2_deploy_redpacket.js
=====================

   Deploying 'RedPacket'
   ---------------------
   > transaction hash:    0x...
   > contract address:    0x5FbDB2315678afecb367f032d93F642f64180aa3
   > account:             0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
   > balance:             99.99...
   > gas used:            1234567
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01... ETH
```

**重要**: 复制 `contract address` 并更新前端代码中的合约地址。

### 6. 更新前端合约地址

编辑 `client/app.js` 文件，将第 3 行的合约地址替换为实际部署的地址：

```javascript
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // 替换为实际地址
```

### 7. 启动前端

```bash
cd client
npm install
npm start
```

前端将在 http://localhost:3000 启动。

## 🔧 MetaMask 配置

### 添加本地网络

1. 打开 MetaMask
2. 点击网络下拉菜单
3. 选择 "添加网络"
4. 输入以下信息：
   - 网络名称: `Ganache Local`
   - RPC URL: `http://127.0.0.1:8545`
   - 链ID: `1337`
   - 货币符号: `ETH`

### 导入测试账户

Ganache 启动时会显示 10 个测试账户和私钥，选择一个导入到 MetaMask：

1. 点击 MetaMask 右上角头像
2. 选择 "导入账户"
3. 粘贴私钥
4. 点击 "导入"

## 📱 使用说明

### 创建红包

1. 连接钱包
2. 输入红包金额（ETH）
3. 设置红包个数（1-10）
4. 填写祝福语
5. 点击 "创建红包"
6. 确认 MetaMask 交易
7. 获得红包ID，分享给朋友

### 抢红包

1. 输入红包ID
2. 点击 "查询红包" 查看信息
3. 确认红包可用
4. 点击 "抢红包"
5. 确认 MetaMask 交易
6. 获得随机金额

## 🧪 运行测试

```bash
npm run test
```

测试将验证：
- 红包创建功能
- 抢红包功能
- 防重复抢夺
- 权限控制

## 📝 合约功能

### 主要函数

- `createRedPacket(uint256 _count, string _message)` - 创建红包
- `claimRedPacket(uint256 _redPacketId)` - 抢红包
- `getRedPacketInfo(uint256 _redPacketId)` - 查询红包信息
- `hasClaimedRedPacket(uint256 _redPacketId, address _user)` - 查询是否已抢
- `deposit()` - 独立存款函数

### 事件

- `RedPacketCreated` - 红包创建事件
- `RedPacketClaimed` - 红包被抢事件

## 🔒 安全特性

- **防重复抢夺**: 每个地址只能抢一次
- **权限控制**: 创建者不能抢自己的红包
- **数量限制**: 红包个数限制为 1-10 个
- **状态管理**: 红包状态自动管理

## 🐛 常见问题

### 1. 合约部署失败

- 确保 Ganache 正在运行
- 检查 `truffle-config.js` 中的网络配置

### 2. MetaMask 连接失败

- 确保 MetaMask 网络设置正确
- 检查 RPC URL 和端口号

### 3. 交易失败

- 确保账户有足够的 ETH
- 检查 gas 费用设置

### 4. 前端无法连接合约

- 确认合约地址已正确更新
- 检查 ABI 是否匹配

## 📂 项目结构

```
solidity_learn/
├── contracts/          # 智能合约源码
│   ├── Migrations.sol
│   └── RedPacket.sol
├── migrations/         # 部署脚本
│   ├── 1_initial_migration.js
│   └── 2_deploy_redpacket.js
├── test/              # 测试文件
│   └── redpacket.test.js
├── client/            # 前端界面
│   ├── index.html
│   ├── app.js
│   └── package.json
├── truffle-config.js  # Truffle 配置
└── package.json       # 项目配置
```

## 🔄 开发流程

1. 修改智能合约 (`contracts/RedPacket.sol`)
2. 重新编译: `npm run compile`
3. 重新部署: `npm run migrate --reset`
4. 更新前端合约地址
5. 测试功能

## 📚 学习资源

- [Truffle 文档](https://www.trufflesuite.com/docs)
- [Solidity 文档](https://docs.soliditylang.org/)
- [Web3.js 文档](https://web3js.readthedocs.io/)
- [MetaMask 文档](https://docs.metamask.io/)