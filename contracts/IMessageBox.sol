// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IMessageBox{
    function message(string memory _message) external;
    function getTotalMessages() external view returns (uint256);
}