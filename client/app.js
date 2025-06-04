// 红包DApp JavaScript文件

// 合约配置
const CONTRACT_ADDRESS = '0x...'; // 部署后替换为实际地址
const CONTRACT_ABI = [
    {
        "inputs": [{"internalType": "uint256", "name": "_count", "type": "uint256"}, {"internalType": "string", "name": "_message", "type": "string"}],
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
        "inputs": [{"internalType": "uint256", "name": "_redPacketId", "type": "uint256"}, {"internalType": "address", "name": "_user", "type": "address"}],
        "name": "hasClaimedRedPacket",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
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

// 全局变量
let web3;
let contract;
let userAccount;

// DOM 元素
const connectWalletBtn = document.getElementById('connectWallet');
const walletInfo = document.getElementById('walletInfo');
const walletAddress = document.getElementById('walletAddress');
const walletBalance = document.getElementById('walletBalance');

const createRedPacketBtn = document.getElementById('createRedPacket');
const createStatus = document.getElementById('createStatus');

const queryRedPacketBtn = document.getElementById('queryRedPacket');
const claimRedPacketBtn = document.getElementById('claimRedPacket');
const redPacketInfo = document.getElementById('redPacketInfo');
const claimStatus = document.getElementById('claimStatus');

// 初始化
window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask 已安装');
        web3 = new Web3(window.ethereum);
        
        // 检查是否已连接
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
            userAccount = accounts[0];
            updateWalletInfo();
            initContract();
        }
    } else {
        alert('请安装 MetaMask 钱包');
    }
});

// 连接钱包
connectWalletBtn.addEventListener('click', async () => {
    try {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
        });
        
        userAccount = accounts[0];
        updateWalletInfo();
        initContract();
        
        showStatus('success', '钱包连接成功', 'createStatus');
    } catch (error) {
        console.error('连接钱包失败:', error);
        showStatus('error', '连接钱包失败: ' + error.message, 'createStatus');
    }
});

// 更新钱包信息
async function updateWalletInfo() {
    if (userAccount) {
        walletAddress.textContent = userAccount;
        
        const balance = await web3.eth.getBalance(userAccount);
        const balanceInEth = web3.utils.fromWei(balance, 'ether');
        walletBalance.textContent = parseFloat(balanceInEth).toFixed(4);
        
        walletInfo.classList.remove('hidden');
        connectWalletBtn.textContent = '钱包已连接';
        connectWalletBtn.disabled = true;
    }
}

// 初始化合约
function initContract() {
    if (CONTRACT_ADDRESS === '0x...') {
        showStatus('error', '请先部署合约并更新合约地址', 'createStatus');
        return;
    }
    
    contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    console.log('合约初始化完成');
}

// 创建红包
createRedPacketBtn.addEventListener('click', async () => {
    if (!contract || !userAccount) {
        showStatus('error', '请先连接钱包', 'createStatus');
        return;
    }
    
    const amount = document.getElementById('amount').value;
    const count = document.getElementById('count').value;
    const message = document.getElementById('message').value;
    
    if (!amount || !count || !message) {
        showStatus('error', '请填写完整信息', 'createStatus');
        return;
    }
    
    if (count > 10) {
        showStatus('error', '红包个数不能超过10个', 'createStatus');
        return;
    }
    
    try {
        createRedPacketBtn.disabled = true;
        createRedPacketBtn.textContent = '创建中...';
        
        const valueInWei = web3.utils.toWei(amount, 'ether');
        
        const result = await contract.methods.createRedPacket(count, message).send({
            from: userAccount,
            value: valueInWei
        });
        
        const redPacketId = result.events.RedPacketCreated.returnValues.redPacketId;
        
        showStatus('success', `红包创建成功！红包ID: ${redPacketId}`, 'createStatus');
        
        // 清空表单
        document.getElementById('amount').value = '';
        document.getElementById('count').value = '';
        document.getElementById('message').value = '';
        
        // 更新余额
        updateWalletInfo();
        
    } catch (error) {
        console.error('创建红包失败:', error);
        showStatus('error', '创建红包失败: ' + error.message, 'createStatus');
    } finally {
        createRedPacketBtn.disabled = false;
        createRedPacketBtn.textContent = '创建红包';
    }
});

// 查询红包
queryRedPacketBtn.addEventListener('click', async () => {
    if (!contract) {
        showStatus('error', '请先连接钱包', 'claimStatus');
        return;
    }
    
    const redPacketId = document.getElementById('redPacketId').value;
    
    if (!redPacketId && redPacketId !== '0') {
        showStatus('error', '请输入红包ID', 'claimStatus');
        return;
    }
    
    try {
        queryRedPacketBtn.disabled = true;
        queryRedPacketBtn.textContent = '查询中...';
        
        const info = await contract.methods.getRedPacketInfo(redPacketId).call();
        
        // 更新红包信息显示
        document.getElementById('creator').textContent = info.creator;
        document.getElementById('totalAmount').textContent = web3.utils.fromWei(info.totalAmount, 'ether');
        document.getElementById('remainingAmount').textContent = web3.utils.fromWei(info.remainingAmount, 'ether');
        document.getElementById('totalCount').textContent = info.totalCount;
        document.getElementById('remainingCount').textContent = info.remainingCount;
        document.getElementById('redPacketMessage').textContent = info.message;
        document.getElementById('isActive').textContent = info.isActive ? '可抢' : '已结束';
        
        redPacketInfo.classList.remove('hidden');
        
        // 检查是否可以抢红包
        if (info.isActive && info.remainingCount > 0 && userAccount) {
            const hasClaimed = await contract.methods.hasClaimedRedPacket(redPacketId, userAccount).call();
            
            if (!hasClaimed && info.creator.toLowerCase() !== userAccount.toLowerCase()) {
                claimRedPacketBtn.classList.remove('hidden');
            } else {
                claimRedPacketBtn.classList.add('hidden');
                if (hasClaimed) {
                    showStatus('error', '您已经抢过这个红包了', 'claimStatus');
                } else if (info.creator.toLowerCase() === userAccount.toLowerCase()) {
                    showStatus('error', '不能抢自己创建的红包', 'claimStatus');
                }
            }
        } else {
            claimRedPacketBtn.classList.add('hidden');
            if (!info.isActive) {
                showStatus('error', '红包已结束', 'claimStatus');
            } else if (info.remainingCount === '0') {
                showStatus('error', '红包已被抢完', 'claimStatus');
            }
        }
        
    } catch (error) {
        console.error('查询红包失败:', error);
        showStatus('error', '查询红包失败: ' + error.message, 'claimStatus');
        redPacketInfo.classList.add('hidden');
        claimRedPacketBtn.classList.add('hidden');
    } finally {
        queryRedPacketBtn.disabled = false;
        queryRedPacketBtn.textContent = '查询红包';
    }
});

// 抢红包
claimRedPacketBtn.addEventListener('click', async () => {
    if (!contract || !userAccount) {
        showStatus('error', '请先连接钱包', 'claimStatus');
        return;
    }
    
    const redPacketId = document.getElementById('redPacketId').value;
    
    try {
        claimRedPacketBtn.disabled = true;
        claimRedPacketBtn.textContent = '抢夺中...';
        
        const result = await contract.methods.claimRedPacket(redPacketId).send({
            from: userAccount
        });
        
        const claimedAmount = result.events.RedPacketClaimed.returnValues.amount;
        const amountInEth = web3.utils.fromWei(claimedAmount, 'ether');
        
        showStatus('success', `恭喜！抢到 ${amountInEth} ETH`, 'claimStatus');
        
        // 更新余额
        updateWalletInfo();
        
        // 重新查询红包信息
        queryRedPacketBtn.click();
        
    } catch (error) {
        console.error('抢红包失败:', error);
        showStatus('error', '抢红包失败: ' + error.message, 'claimStatus');
    } finally {
        claimRedPacketBtn.disabled = false;
        claimRedPacketBtn.textContent = '抢红包';
    }
});

// 显示状态信息
function showStatus(type, message, elementId) {
    const statusElement = document.getElementById(elementId);
    statusElement.className = `status ${type}`;
    statusElement.textContent = message;
    statusElement.style.display = 'block';
    
    // 3秒后自动隐藏
    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 3000);
}

// 监听账户变化
if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            userAccount = accounts[0];
            updateWalletInfo();
        } else {
            // 用户断开连接
            userAccount = null;
            walletInfo.classList.add('hidden');
            connectWalletBtn.textContent = '连接钱包';
            connectWalletBtn.disabled = false;
        }
    });
    
    window.ethereum.on('chainChanged', (chainId) => {
        // 网络变化时重新加载页面
        window.location.reload();
    });
}