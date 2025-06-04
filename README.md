# Solidity 学习项目 - 红包 DApp

![](https://img.shields.io/badge/Solidity-0.8.19-blue)
![](https://img.shields.io/badge/Truffle-v5.11.5-orange)
![](https://img.shields.io/badge/Web3.js-1.8.0-green)

一个基于 Truffle 框架的简单红包智能合约项目，用于学习 Solidity 开发。

## 🎯 项目特性

- ✅ **创建红包**: 设置金额、个数和祝福语
- ✅ **抢红包**: 通过红包ID获得随机奖励
- ✅ **防重复**: 每个地址只能抢一次
- ✅ **权限控制**: 创建者不能抢自己的红包
- ✅ **简单前端**: 基础的Web界面交互
- ✅ **本地部署**: 使用Ganache本地测试网络

## 📸 项目截图

### 前端界面
- 🔗 钱包连接功能
- 🎁 创建红包界面
- 💰 抢红包功能
- 📊 红包信息查询

## 🛠 技术栈

### 智能合约
- **Solidity 0.8.19** - 智能合约语言
- **Truffle 5.11.5** - 开发框架
- **Ganache** - 本地区块链

### 前端
- **HTML5 + CSS3** - 基础界面
- **JavaScript ES6** - 交互逻辑
- **Web3.js 1.8.0** - 区块链连接
- **MetaMask** - 钱包集成

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
```bash
npm run ganache
```

### 4. 编译和部署合约
```bash
npm run compile
npm run migrate
```

### 5. 启动前端
```bash
cd client
npm install
npm start
```

📖 **详细部署指南**: 查看 [DEPLOY.md](./DEPLOY.md) 获取完整的部署说明。

## 📂 项目结构

```
solidity_learn/
├── contracts/          # 智能合约源码
│   ├── Migrations.sol     # Truffle迁移合约
│   └── RedPacket.sol      # 红包主合约
├── migrations/         # 部署脚本
│   ├── 1_initial_migration.js
│   └── 2_deploy_redpacket.js
├── test/              # 测试文件
│   └── redpacket.test.js  # 合约测试
├── client/            # 前端界面
│   ├── index.html        # 主页面
│   ├── app.js           # 交互逻辑
│   └── package.json     # 前端依赖
├── truffle-config.js  # Truffle配置
├── package.json       # 项目依赖
├── README.md          # 项目说明
└── DEPLOY.md          # 部署指南
```

## 🔧 核心功能

### 智能合约功能
```solidity
// 创建红包
function createRedPacket(uint256 _count, string memory _message) external payable

// 抢红包
function claimRedPacket(uint256 _redPacketId) external

// 查询红包信息
function getRedPacketInfo(uint256 _redPacketId) external view

// 检查是否已抢过
function hasClaimedRedPacket(uint256 _redPacketId, address _user) external view

// 独立存款函数
function deposit() public payable
```

### 前端功能
- 🔗 MetaMask钱包连接
- 💰 账户余额显示
- 🎁 创建红包界面
- 🔍 红包信息查询
- 💸 抢红包交互

## 🧪 测试

运行智能合约测试：
```bash
npm run test
```

测试覆盖：
- ✅ 红包创建功能
- ✅ 红包抢夺功能
- ✅ 防重复抢夺
- ✅ 权限验证

## 🔒 安全特性

- **重入攻击防护**: 使用状态更新在转账前完成
- **权限控制**: 创建者与抢夺者分离
- **防重复**: mapping记录已抢夺地址
- **数量限制**: 红包个数限制1-10个
- **金额验证**: 严格的输入参数检查

## 💡 学习要点

### Solidity 概念
- `struct` 结构体定义
- `mapping` 映射数据结构
- `modifier` 修饰器（可扩展）
- `event` 事件记录
- `payable` 支付功能

### Web3 交互
- 钱包连接流程
- 合约实例化
- 交易发送与确认
- 事件监听
- 错误处理

### Truffle 工具
- 项目初始化
- 合约编译
- 智能合约部署
- 单元测试编写

## 🌟 功能演示

### 创建红包流程
1. 连接MetaMask钱包
2. 输入红包金额(ETH)
3. 设置红包个数(1-10)
4. 填写祝福语
5. 确认交易创建
6. 获得红包ID

### 抢红包流程
1. 输入红包ID
2. 查询红包信息
3. 确认可抢状态
4. 点击抢红包
5. 确认交易
6. 获得随机金额

## 📚 学习资源

- [Solidity 官方文档](https://docs.soliditylang.org/)
- [Truffle 框架文档](https://www.trufflesuite.com/docs)
- [Web3.js 开发指南](https://web3js.readthedocs.io/)
- [MetaMask 开发者文档](https://docs.metamask.io/)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进项目！

### 贡献指南
1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- GitHub: [@kecan](https://github.com/kecan)
- 项目链接: [https://github.com/kecan/solidity_learn](https://github.com/kecan/solidity_learn)

## ⭐ 支持项目

如果这个项目对你有帮助，请给它一个星星 ⭐️

---

**学习愉快！Happy Coding! 🚀**