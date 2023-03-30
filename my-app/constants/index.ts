export const dataStoreContract="0x71Aa0165df40872B55C41A79ad9Eb99f54813fF7"
export const dataStoreContractABI=[
  {
    "inputs": [],
    "name": "getMemberCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "count",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "orderMembers",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "swapDone",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "givenValue",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "targetValue",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "metamask",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "name": "swapStart",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "userData",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "givenvalue",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "targetvalue",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "deadline",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
export const stakeContract = "0x8590CFD32B4ADcEaD15d498Cf9DE10E51Ef58Eba";
export const stakeContractABI = [
  {
    inputs: [
      {
        internalType: "contract TokenERC20",
        name: "_erc20TokenAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "issueToken",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "stakeToken",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        "internalType": "uint256",
        "name": "targetValue",
        "type": "uint256"
      }
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "stakingInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "stakingBalance",
        type: "uint256",
      },
      {
        "internalType": "uint256",
        "name": "targetvalue",
        "type": "uint256"
      }
    ],
    name: "unstakeTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
