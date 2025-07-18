import React, { useState, useEffect } from 'react'
import { useAccount, usePrepareContractWrite, useContractWrite, useContractRead, useWaitForTransaction, useBalance } from 'wagmi'
import { ConnectKitButton } from 'connectkit'
import { parseEther, formatEther } from 'viem'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract'

function RedPacketDApp() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })

  // 创建红包状态
  const [createForm, setCreateForm] = useState({
    amount: '',
    count: '',
    message: ''
  })

  // 抢红包状态
  const [claimRedPacketId, setClaimRedPacketId] = useState('')
  const [showRedPacketInfo, setShowRedPacketInfo] = useState(false)

  // 状态信息
  const [createStatus, setCreateStatus] = useState('')
  const [claimStatus, setClaimStatus] = useState('')

  // 准备创建红包交易
  const { config: createConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'createRedPacket',
    args: createForm.count ? [BigInt(createForm.count), createForm.message] : undefined,
    value: createForm.amount ? parseEther(createForm.amount) : undefined,
    enabled: !!(createForm.amount && createForm.count && createForm.message && CONTRACT_ADDRESS !== '0x...'),
  })

  // 准备抢红包交易
  const { config: claimConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'claimRedPacket',
    args: claimRedPacketId ? [BigInt(claimRedPacketId)] : undefined,
    enabled: !!(claimRedPacketId && CONTRACT_ADDRESS !== '0x...'),
  })

  // 执行创建红包
  const { write: createRedPacket, data: createData, isLoading: isCreateLoading } = useContractWrite(createConfig)

  // 执行抢红包
  const { write: claimRedPacket, data: claimData, isLoading: isClaimLoading } = useContractWrite(claimConfig)

  // 等待创建红包交易确认
  const { isLoading: isCreateConfirming, isSuccess: isCreateSuccess } = useWaitForTransaction({
    hash: createData?.hash,
  })

  // 等待抢红包交易确认
  const { isLoading: isClaimConfirming, isSuccess: isClaimSuccess } = useWaitForTransaction({
    hash: claimData?.hash,
  })

  // 查询红包信息
  const { data: redPacketData, refetch: refetchRedPacketInfo } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getRedPacketInfo',
    args: claimRedPacketId ? [BigInt(claimRedPacketId)] : undefined,
    enabled: !!(claimRedPacketId && CONTRACT_ADDRESS !== '0x...'),
  })

  // 查询是否已抢过红包
  const { data: hasClaimedData, refetch: refetchHasClaimed } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'hasClaimedRedPacket',
    args: claimRedPacketId && address ? [BigInt(claimRedPacketId), address] : undefined,
    enabled: !!(claimRedPacketId && address && CONTRACT_ADDRESS !== '0x...'),
  })

  // 创建红包处理函数
  const handleCreateRedPacket = async () => {
    if (!createForm.amount || !createForm.count || !createForm.message) {
      setCreateStatus('请填写完整信息')
      return
    }

    if (parseInt(createForm.count) > 10) {
      setCreateStatus('红包个数不能超过10个')
      return
    }

    if (CONTRACT_ADDRESS === '0x...') {
      setCreateStatus('请先部署合约并更新合约地址')
      return
    }

    try {
      setCreateStatus('准备创建...')
      if (createRedPacket) {
        createRedPacket()
        setCreateStatus('交易提交中...')
      }
    } catch (error) {
      console.error('创建红包失败:', error)
      setCreateStatus('创建红包失败: ' + error.message)
    }
  }

  // 抢红包处理函数
  const handleClaimRedPacket = async () => {
    if (!claimRedPacketId) {
      setClaimStatus('请输入红包ID')
      return
    }

    if (CONTRACT_ADDRESS === '0x...') {
      setClaimStatus('请先部署合约并更新合约地址')
      return
    }

    try {
      setClaimStatus('准备抢夺...')
      if (claimRedPacket) {
        claimRedPacket()
        setClaimStatus('交易提交中...')
      }
    } catch (error) {
      console.error('抢红包失败:', error)
      setClaimStatus('抢红包失败: ' + error.message)
    }
  }

  // 查询红包信息
  const handleQueryRedPacket = () => {
    if (claimRedPacketId) {
      refetchRedPacketInfo()
      refetchHasClaimed()
      setShowRedPacketInfo(true)
    }
  }

  // 监听交易确认
  useEffect(() => {
    if (isCreateSuccess) {
      setCreateStatus('红包创建成功！')
      setCreateForm({ amount: '', count: '', message: '' })
    }
  }, [isCreateSuccess])

  useEffect(() => {
    if (isClaimSuccess) {
      setClaimStatus('红包抢夺成功！')
      // 刷新红包信息
      setTimeout(() => {
        refetchRedPacketInfo()
        refetchHasClaimed()
      }, 1000)
    }
  }, [isClaimSuccess, refetchRedPacketInfo, refetchHasClaimed])

  const StatusMessage = ({ message, type = 'info' }) => {
    if (!message) return null
    return (
      <div className={`status ${type}`}>
        {message}
      </div>
    )
  }

  return (
    <>
      {/* 钱包连接区域 */}
      <div className="card">
        <ConnectKitButton />
        {isConnected && (
          <div className="wallet-info">
            <p><strong>钱包地址:</strong> {address}</p>
            <p><strong>余额:</strong> {balance ? formatEther(balance.value) : '0'} ETH</p>
          </div>
        )}
      </div>

      {!isConnected ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 30px' }}>
          <h2>请先连接钱包使用红包功能</h2>
        </div>
      ) : (
        <div className="grid">
          {/* 创建红包 */}
          <div className="card">
            <h2>🎁 创建红包</h2>
            <div className="form-group">
              <label>红包金额 (ETH)</label>
              <input
                type="number"
                step="0.001"
                placeholder="0.1"
                value={createForm.amount}
                onChange={(e) => setCreateForm({ ...createForm, amount: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>红包个数</label>
              <input
                type="number"
                min="1"
                max="10"
                placeholder="3"
                value={createForm.count}
                onChange={(e) => setCreateForm({ ...createForm, count: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>祝福语</label>
              <textarea
                rows="3"
                placeholder="恭喜发财，大吉大利！"
                value={createForm.message}
                onChange={(e) => setCreateForm({ ...createForm, message: e.target.value })}
              />
            </div>
            <button
              className="btn"
              onClick={handleCreateRedPacket}
              disabled={isCreateLoading || isCreateConfirming}
            >
              {isCreateLoading || isCreateConfirming ? '处理中...' : '创建红包'}
            </button>
            <StatusMessage 
              message={createStatus} 
              type={createStatus.includes('成功') ? 'success' : 'error'} 
            />
          </div>

          {/* 抢红包 */}
          <div className="card">
            <h2>💰 抢红包</h2>
            <div className="form-group">
              <label>红包ID</label>
              <input
                type="number"
                placeholder="0"
                value={claimRedPacketId}
                onChange={(e) => setClaimRedPacketId(e.target.value)}
              />
            </div>
            <button
              className="btn btn-success"
              onClick={handleQueryRedPacket}
              style={{ marginBottom: '10px' }}
            >
              查询红包
            </button>

            {/* 红包信息显示 */}
            {showRedPacketInfo && redPacketData && (
              <div className="info-box">
                <h3>红包信息</h3>
                <p><strong>创建者:</strong> {redPacketData[0]}</p>
                <p><strong>总金额:</strong> {formatEther(redPacketData[1])} ETH</p>
                <p><strong>剩余金额:</strong> {formatEther(redPacketData[2])} ETH</p>
                <p><strong>总个数:</strong> {redPacketData[3].toString()}</p>
                <p><strong>剩余个数:</strong> {redPacketData[4].toString()}</p>
                <p><strong>祝福语:</strong> {redPacketData[5]}</p>
                <p><strong>状态:</strong> 
                  <span style={{ 
                    color: redPacketData[6] ? 'green' : 'red',
                    fontWeight: 'bold',
                    marginLeft: '5px'
                  }}>
                    {redPacketData[6] ? '可抢' : '已结束'}
                  </span>
                </p>
                {hasClaimedData && (
                  <p><strong>您的状态:</strong> 
                    <span style={{ color: 'blue', fontWeight: 'bold', marginLeft: '5px' }}>
                      已抢过
                    </span>
                  </p>
                )}
              </div>
            )}

            <button
              className="btn"
              onClick={handleClaimRedPacket}
              disabled={
                isClaimLoading || 
                isClaimConfirming || 
                !redPacketData?.[6] || 
                hasClaimedData ||
                redPacketData?.[0]?.toLowerCase() === address?.toLowerCase()
              }
              style={{ 
                display: showRedPacketInfo && redPacketData?.[6] && !hasClaimedData && 
                         redPacketData?.[0]?.toLowerCase() !== address?.toLowerCase() ? 'block' : 'none' 
              }}
            >
              {isClaimLoading || isClaimConfirming ? '抢夺中...' : '抢红包'}
            </button>
            
            <StatusMessage 
              message={claimStatus} 
              type={claimStatus.includes('成功') ? 'success' : 'error'} 
            />
          </div>
        </div>
      )}

      {/* 使用说明 */}
      <div className="card">
        <h3>📖 使用说明</h3>
        <div className="grid">
          <div>
            <h4>创建红包</h4>
            <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
              <li>设置红包总金额和个数（1-10个）</li>
              <li>编写祝福语</li>
              <li>确认交易创建红包</li>
              <li>获得红包ID分享给朋友</li>
            </ul>
          </div>
          <div>
            <h4>抢红包</h4>
            <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
              <li>输入红包ID查询信息</li>
              <li>确认红包可用且未抢过</li>
              <li>点击抢红包按钮</li>
              <li>平均获得红包金额</li>
            </ul>
          </div>
        </div>
        {CONTRACT_ADDRESS === '0x...' && (
          <div className="status error" style={{ marginTop: '15px' }}>
            ⚠️ 请先部署智能合约并在 src/config/contract.js 中更新合约地址
          </div>
        )}
      </div>
    </>
  )
}

export default RedPacketDApp