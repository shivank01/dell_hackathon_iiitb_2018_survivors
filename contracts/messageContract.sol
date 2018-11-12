pragma solidity ^0.4.24;

contract messageContract{
    
    //structure of message
    struct message{
        bytes32 orderpart;
        uint orderno;
        bytes32 orderdesc;
        uint ordertime;
        address ordersender;
        address orderreceiver;
    }

    uint public x =2;
    message public newMessage =  message(0xcc,0,0xaa,now,0xc53dd799c36fe7ce3c47e405e0e2a6d2bf7c1826,0xc53dd799c36fe7ce3c47e405e0e2a6d2bf7c1826);  //making object
    
    //Constructor
    constructor(){
        newMessage.orderpart = 0xcc;  // unique identity
        newMessage.orderno = 0;
        newMessage.orderdesc = 0xaa;  //description
        newMessage.ordertime = now ; //sending time
    }

    //function to send the message (setter in language of blockchain and solidity)
    function sendMessage(bytes32 part, uint no, bytes32 desc, address addr){
        newMessage.orderpart = part;
        newMessage.orderno = no;
        newMessage.orderdesc = desc;
        newMessage.ordersender = msg.sender;
        newMessage.orderreceiver = addr;
        newMessage.ordertime = now;
    }

    function test(bytes32 part) constant public returns(uint){
        return (x);
    }
    //function to read the message (getter in language of blockchain and solidity)
    function readMessage(bytes32 part) constant public returns( uint no, bytes32 desc, uint time, address sender, address receiver){
        if(msg.sender != newMessage.orderreceiver) throw;
        if( newMessage.orderpart != part) throw;
        return (newMessage.orderno,newMessage.orderdesc,newMessage.ordertime,newMessage.ordersender,newMessage.orderreceiver);
    }
}