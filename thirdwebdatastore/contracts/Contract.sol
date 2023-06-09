// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DataStore3{

    struct info{
        uint256 givenvalue;
        uint256 targetvalue;
        uint256 deadline;
    }

    address [] public orderMembers;

    mapping(address=>info) public userData;

    function getMemberCount() public view returns(uint256 count) {
        return orderMembers.length;
    }

    function removeMember(uint256 index) internal {
        if (index >= orderMembers.length) return;

        for (uint i = index; i<orderMembers.length-1; i++){
            orderMembers[i] = orderMembers[i+1];
        }
        orderMembers.pop();
    }

    function swapStart(uint256 givenValue,uint256 targetValue,address metamask,uint256 deadline) public {
        orderMembers.push(metamask);
        userData[metamask].givenvalue=givenValue;
        userData[metamask].targetvalue=targetValue;
        userData[metamask].deadline=deadline;
    }

    function swapDone(address receiver,uint256 index) public{
        removeMember(index);
        userData[receiver].givenvalue=0;
        userData[receiver].targetvalue=0;
    }

  }