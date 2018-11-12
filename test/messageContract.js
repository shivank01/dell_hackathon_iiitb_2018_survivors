var messageContract = artifacts.require("./messageContract.sol");

contract("messageContract", function(accounts) {
  var messageContractInstance;

  it("initializes", function() {
    return messageContract.deployed().then(function(instance) {
      return instance.newMessage();
    }).then(function(count) {
      assert.equal(count.length, 6);
    });
  });

 
});
