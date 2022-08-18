// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract MessageBox {
    uint256 totalMessages;
  

    event NewMessage(address indexed from, uint256 timestamp, string message);

    struct Message {
        address waver;
        string message;
        uint256 timestamp;
    }

    Message[] messages;

    
    mapping(address => uint256) public lastMessage;

    constructor() payable {
        console.log("We have been constructed!");
        
    
    }

    function message(string memory _message) public {
       
        require(lastMessage[msg.sender] + 30 seconds < block.timestamp, "Wait until 30 seconds before  you can message again.");

      
        lastMessage[msg.sender] = block.timestamp;

        totalMessages += 1;
        console.log("%s has messaged!", msg.sender);

        messages.push(Message(msg.sender, _message, block.timestamp));

       

        emit NewMessage(msg.sender, block.timestamp, _message);
    }

    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }

    function getTotalMessages() public view returns (uint256) {
        return totalMessages;
    }
}
