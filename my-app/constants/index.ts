export const dataStoreContract="0x99B54B04771C33f0794BE705d87E79d7314B122a"
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
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]