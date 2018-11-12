App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("messageContract.json", function(messageContract) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.messageContract = TruffleContract(messageContract);
      // Connect provider to interact with contract
      App.contracts.messageContract.setProvider(App.web3Provider);

      App.render();

      return App.render();
    });
  },

  // Listen for events emitted from the contract

  render: function() {
    var messageContractInstance;
    var loader = $("#loader");
    var content = $("#content");

    //loader.show();
    content.show();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.messageContract.deployed().then(function(instance) {
      messageContractInstance = instance;
     // console.log('3'+electionInstance.getx().call().toString());
     //console.log('3'+messageContractInstance.x.toString());
     //console.log("11"+messageContractInstance.x());
      return messageContractInstance.newMessage();
    }).then(function(Message) {

   function hex_to_ascii(str1)
  {
  var nhex  = str1.toString();
  var hex = "";
  for (var i = 0; i < nhex.length; i++) {
    if(nhex[i] != 0 )
      if(nhex[i] != 'x')
        hex+=nhex[i];
  }
  console.log(hex);
  var str = '';
  for (var n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
  }

    console.log("Message"+Message);
    console.log("No."+Message[1]);
      console.log("desc"+desc);
      var part = hex_to_ascii(Message[0].toString());
      var no = Message[2];
      var time = Date(Message[3]);
      var sender = Message[4];

      var orderno = $('#OrderNo');
      orderno.empty();
      orderno.append("part");

      console.log("Hello"+orderno.innerHTML);
      var ordertime = $('#Time');
      ordertime.append(time);
      var ordersender = $('#sender');
      ordersender.append(sender);
      
      return 2;
    }).then(function(hasVoted) {
      //console.log("final"+hasVoted);
      //console.log("new"+Message[0]);
      // Do not allow a user to vote
      if(hasVoted) {
        $('form').hide();
      }
      //loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  SendMessage: function() {
    function ascii_to_hexa(str)
  {
  var arr1 = [];
  for (var n = 0, l = str.length; n < l; n ++) 
     {
    var hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
   }
  return arr1.join('');
   }
    var NewPart = ascii_to_hexa($('#msgpart').toString());
     var Newno = Number($('msgno'));
     var sender = $('msgsender');
    console.log("NewPart"+NewPart);

    

    App.contracts.messageContract.deployed().then(function(instance) {
     instance.sendMessage(NewPart,Newno,0xaa,0xc53dd799c36fe7ce3c47e405e0e2a6d2bf7c1826, { from: App.account });
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
