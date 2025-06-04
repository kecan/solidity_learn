# 故障排除指南

## 🔧 解决 "Cannot read properties of undefined (reading 'ssr')" 错误

这个错误已经修复！我们降级到了稳定的版本组合：

- **Wagmi v1.4.13** (而不是 v2+)
- **ConnectKit v1.6.0**
- **@tanstack/react-query v4.36.1**
- **Viem v1.21.4**

## 🚀 重新安装步骤

如果你之前遇到了错误，请按以下步骤重新安装：

```bash
# 1. 进入客户端目录
cd client

# 2. 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 3. 重新安装依赖
npm install

# 4. 启动开发服务器
npm run dev
```

## 🐛 常见问题

### 1. 版本兼容性问题

**问题**: SSR 相关错误
**解决**: 确保使用正确的版本组合（已在 package.json 中固定）

### 2. MetaMask 连接问题

**问题**: 钱包连接失败
**解决**: 
- 确保 MetaMask 已安装
- 添加本地网络配置：
  - 网络名称: `Ganache Local`
  - RPC URL: `http://127.0.0.1:8545`
  - 链ID: `1337`
  - 货币符号: `ETH`

### 3. 合约交互失败

**问题**: 合约地址未设置
**解决**: 
1. 先部署合约: `npm run migrate`
2. 复制合约地址
3. 更新 `client/src/config/contract.js` 中的 `CONTRACT_ADDRESS`

### 4. 交易失败

**问题**: Gas 费用或余额不足
**解决**:
- 确保账户有足够的 ETH
- 检查 Ganache 是否正在运行
- 重启 Ganache 和前端

### 5. Vite 构建问题

**问题**: 模块解析错误
**解决**: 
```bash
# 清除 Vite 缓存
rm -rf node_modules/.vite
npm run dev
```

## 📝 完整的重新部署流程

如果遇到任何问题，可以完全重新开始：

```bash
# 1. 停止所有服务 (Ctrl+C)

# 2. 重启 Ganache
npm run ganache

# 3. 重新部署合约
npm run compile
npm run migrate --reset

# 4. 更新合约地址
# 编辑 client/src/config/contract.js

# 5. 重新安装前端依赖
cd client
rm -rf node_modules package-lock.json
npm install

# 6. 启动前端
npm run dev
```

## ✅ 验证安装

前端启动成功后，你应该看到：

1. ✅ 页面正常加载（无控制台错误）
2. ✅ ConnectKit 钱包连接按钮显示
3. ✅ 能够连接 MetaMask
4. ✅ 显示账户地址和余额
5. ✅ 创建红包和抢红包功能可用

如果还有问题，请检查浏览器控制台的错误信息！