// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../node_modules/@thirdweb-dev/contracts/token/TokenERC20.sol";

contract Contract {
    uint public constant tokensPerGETH = 20000; 

    TokenERC20 public immutable token;
    address[] public stakers;

    struct info{
        uint256 stakingBalance;
        bool hasStaked;
    }

    mapping(address => info) public stakingInfo;

    event stakeToken(address user, uint256 amount);
    event unstakeToken(address user, uint256 amount);
    event issueToken(string message);

    constructor(TokenERC20 _erc20TokenAddress) {
        token = _erc20TokenAddress;
    }

    function stakeTokens() public payable{
        require(msg.value > 0, "amount cannot be 0");
        address user = msg.sender;
        uint256 _amount = msg.value * tokensPerGETH;

        if (!stakingInfo[msg.sender].hasStaked) {
            stakers.push(msg.sender);
        }

        stakingInfo[msg.sender].stakingBalance += _amount;
        stakingInfo[msg.sender].hasStaked = true;

        emit stakeToken(user, _amount);
    }

    function issueTokens() public {
        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i]; 
            uint256 balance = stakingInfo[recipient].stakingBalance/10; 
            if (balance > 0) {
                stakingInfo[recipient].stakingBalance += balance;
            }
        }

        emit issueToken("Tokens issued");
    }

    function unstakeTokens() public {
        uint256 balance = stakingInfo[msg.sender].stakingBalance;
        require(balance > 0, "staking balance cannot be less than zero");
        token.transfer(msg.sender, balance);
        stakingInfo[msg.sender].stakingBalance = 0;
        stakingInfo[msg.sender].hasStaked = false;

        emit unstakeToken(msg.sender, balance);
    }
}
