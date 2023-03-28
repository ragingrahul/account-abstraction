export const dataStoreContract="0xEe033a6C7E5D6e868783EBB1c97EcCDD5Abb5941"
export const dataStoreContractABI=[
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
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