// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract RedPacket {
    struct RedPacketInfo {
        address creator;
        uint256 totalAmount;
        uint256 remainingAmount;
        uint256 totalCount;
        uint256 remainingCount;
        string message;
        bool isActive;
        mapping(address => bool) claimed;
        address[] claimers;
    }
    
    mapping(uint256 => RedPacketInfo) public redPackets;
    uint256 public nextRedPacketId;
    
    event RedPacketCreated(
        uint256 indexed redPacketId,
        address indexed creator,
        uint256 totalAmount,
        uint256 totalCount,
        string message
    );
    
    event RedPacketClaimed(
        uint256 indexed redPacketId,
        address indexed claimer,
        uint256 amount
    );
    
    // 创建红包
    function createRedPacket(
        uint256 _count,
        string memory _message
    ) external payable returns (uint256) {
        require(msg.value > 0, "Amount must be greater than 0");
        require(_count > 0, "Count must be greater than 0");
        require(_count <= 10, "Count cannot exceed 10");
        
        uint256 redPacketId = nextRedPacketId++;
        RedPacketInfo storage redPacket = redPackets[redPacketId];
        
        redPacket.creator = msg.sender;
        redPacket.totalAmount = msg.value;
        redPacket.remainingAmount = msg.value;
        redPacket.totalCount = _count;
        redPacket.remainingCount = _count;
        redPacket.message = _message;
        redPacket.isActive = true;
        
        emit RedPacketCreated(redPacketId, msg.sender, msg.value, _count, _message);
        
        return redPacketId;
    }
    
    // 抢红包
    function claimRedPacket(uint256 _redPacketId) external {
        RedPacketInfo storage redPacket = redPackets[_redPacketId];
        
        require(redPacket.isActive, "Red packet is not active");
        require(redPacket.remainingCount > 0, "No red packets left");
        require(!redPacket.claimed[msg.sender], "Already claimed");
        require(redPacket.creator != msg.sender, "Creator cannot claim own red packet");
        
        // 简单的平均分配
        uint256 claimAmount = redPacket.remainingAmount / redPacket.remainingCount;
        
        // 更新状态
        redPacket.claimed[msg.sender] = true;
        redPacket.claimers.push(msg.sender);
        redPacket.remainingAmount -= claimAmount;
        redPacket.remainingCount--;
        
        // 如果是最后一个红包，标记为非活跃状态
        if (redPacket.remainingCount == 0) {
            redPacket.isActive = false;
        }
        
        // 转账
        payable(msg.sender).transfer(claimAmount);
        
        emit RedPacketClaimed(_redPacketId, msg.sender, claimAmount);
    }
    
    // 查询红包信息
    function getRedPacketInfo(uint256 _redPacketId) external view returns (
        address creator,
        uint256 totalAmount,
        uint256 remainingAmount,
        uint256 totalCount,
        uint256 remainingCount,
        string memory message,
        bool isActive
    ) {
        RedPacketInfo storage redPacket = redPackets[_redPacketId];
        return (
            redPacket.creator,
            redPacket.totalAmount,
            redPacket.remainingAmount,
            redPacket.totalCount,
            redPacket.remainingCount,
            redPacket.message,
            redPacket.isActive
        );
    }
    
    // 查询用户是否已抢过红包
    function hasClaimedRedPacket(uint256 _redPacketId, address _user) external view returns (bool) {
        return redPackets[_redPacketId].claimed[_user];
    }
    
    // 独立的存款函数
    function deposit() public payable {
        // 允许合约接收ETH
    }
    
    // 接收ETH
    receive() external payable {
        deposit();
    }
    
    fallback() external payable {
        deposit();
    }
}