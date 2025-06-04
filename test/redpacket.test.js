const RedPacket = artifacts.require("RedPacket");

contract("RedPacket", (accounts) => {
  let redPacketInstance;
  const [creator, claimer1, claimer2] = accounts;

  beforeEach(async () => {
    redPacketInstance = await RedPacket.new();
  });

  it("should create a red packet", async () => {
    const result = await redPacketInstance.createRedPacket(
      3,
      "Happy New Year!",
      { from: creator, value: web3.utils.toWei("1", "ether") }
    );

    const redPacketId = result.logs[0].args.redPacketId;
    const info = await redPacketInstance.getRedPacketInfo(redPacketId);

    assert.equal(info.creator, creator, "Creator should match");
    assert.equal(info.totalAmount, web3.utils.toWei("1", "ether"), "Total amount should match");
    assert.equal(info.totalCount, 3, "Total count should match");
    assert.equal(info.message, "Happy New Year!", "Message should match");
    assert.equal(info.isActive, true, "Red packet should be active");
  });

  it("should allow claiming red packet", async () => {
    // Create red packet
    const result = await redPacketInstance.createRedPacket(
      2,
      "Test packet",
      { from: creator, value: web3.utils.toWei("1", "ether") }
    );

    const redPacketId = result.logs[0].args.redPacketId;

    // Claim red packet
    const balanceBefore = await web3.eth.getBalance(claimer1);
    await redPacketInstance.claimRedPacket(redPacketId, { from: claimer1 });
    const balanceAfter = await web3.eth.getBalance(claimer1);

    // Check if claimed
    const hasClaimed = await redPacketInstance.hasClaimedRedPacket(redPacketId, claimer1);
    assert.equal(hasClaimed, true, "Should have claimed");

    // Check remaining count
    const info = await redPacketInstance.getRedPacketInfo(redPacketId);
    assert.equal(info.remainingCount, 1, "Remaining count should be 1");
  });

  it("should prevent double claiming", async () => {
    // Create red packet
    const result = await redPacketInstance.createRedPacket(
      2,
      "Test packet",
      { from: creator, value: web3.utils.toWei("1", "ether") }
    );

    const redPacketId = result.logs[0].args.redPacketId;

    // First claim
    await redPacketInstance.claimRedPacket(redPacketId, { from: claimer1 });

    // Second claim should fail
    try {
      await redPacketInstance.claimRedPacket(redPacketId, { from: claimer1 });
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.include(error.message, "Already claimed", "Should prevent double claiming");
    }
  });
});