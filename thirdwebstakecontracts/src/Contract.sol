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

    function stakeTokens(address _user) public payable{
        require(msg.value > 0, "amount cannot be 0");
        uint256 _amount = msg.value * tokensPerGETH;

        if (!stakingInfo[_user].hasStaked) {
            stakers.push(_user);
        }

        stakingInfo[_user].stakingBalance += _amount;
        stakingInfo[_user].hasStaked = true;

        emit stakeToken(_user, _amount);
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

    function unstakeTokens(address _user) public {
        uint256 balance = stakingInfo[_user].stakingBalance;
        require(balance > 0, "staking balance cannot be less than zero");
        token.transfer(_user, balance);
        stakingInfo[_user].stakingBalance = 0;
        stakingInfo[_user].hasStaked = false;

        emit unstakeToken(_user, balance);
    }
}
