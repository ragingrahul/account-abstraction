// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Contract {
    struct info{
        uint256 givenvalue;
        uint256 targetvalue;
    }

    mapping(address=>info) public userData;

    function swapStart(uint256 givenValue,uint targetValue) public {
        userData[msg.sender].givenvalue=givenValue;
        userData[msg.sender].targetvalue=targetValue;
    }

    function swapDone(address receiver) public{
        userData[receiver].givenvalue=0;
        userData[receiver].targetvalue=0;
    }
}