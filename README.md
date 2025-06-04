# Solidity 学习项目 - 红包 DApp

一个基于 Truffle 框架的简单红包智能合约项目，用于学习 Solidity 开发。

## 项目结构

```
solidity_learn/
├── contracts/          # 智能合约源码
├── migrations/         # 部署脚本
├── test/              # 测试文件
├── client/            # 前端界面
├── truffle-config.js  # Truffle 配置
└── package.json       # 项目配置
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动本地区块链

```bash
npm run ganache
```

### 3. 编译合约

```bash
npm run compile
```

### 4. 部署合约

```bash
npm run migrate
```

### 5. 运行测试

```bash
npm run test
```

### 6. 启动前端

```bash
cd client
npm install
npm start
```

## 功能特性

- ✅ 创建红包
- ✅ 抢红包
- ✅ 查询红包信息
- ✅ 防重复抢夺
- ✅ 基础前端界面

## 合约地址

部署完成后会在这里显示合约地址。
