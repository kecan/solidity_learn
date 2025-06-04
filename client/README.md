# React + Wagmi + ConnectKit 前端说明

这个目录包含了使用现代 React 技术栈重写的红包 DApp 前端。

## 技术栈

- **React 18** - 现代 React 框架
- **Vite** - 快速构建工具
- **Wagmi** - 以太坊 React Hooks
- **ConnectKit** - 美观的钱包连接组件
- **Viem** - 类型安全的以太坊库

## 项目结构

```
client/
├── src/
│   ├── components/          # React 组件
│   │   └── RedPacketDApp.jsx   # 主要 DApp 组件
│   ├── config/             # 配置文件
│   │   ├── wagmi.js           # Wagmi 配置
│   │   └── contract.js        # 合约配置
│   ├── App.jsx             # 主应用组件
│   ├── main.jsx            # React 入口
│   └── index.css           # 样式文件
├── index.html              # HTML 模板
├── vite.config.js          # Vite 配置
└── package.json            # 依赖管理
```

## 启动步骤

1. 安装依赖:
```bash
cd client
npm install
```

2. 启动开发服务器:
```bash
npm run dev
```

3. 访问: http://localhost:3000

## 重要提醒

在使用前端之前，请确保：

1. **部署智能合约**: 先运行 `npm run migrate` 部署合约
2. **更新合约地址**: 编辑 `src/config/contract.js` 文件，将 `CONTRACT_ADDRESS` 替换为实际的合约地址
3. **配置 MetaMask**: 添加本地网络并导入测试账户

## 功能特性

- ✅ 现代化的 React 界面
- ✅ ConnectKit 钱包连接体验
- ✅ Wagmi React Hooks 集成
- ✅ 实时余额显示
- ✅ 交易状态监听
- ✅ 响应式设计
- ✅ 错误处理