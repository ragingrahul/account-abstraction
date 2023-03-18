const {ethers} = require('ethers')
const {abi:IUniswapV3PoolABI} =require('@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json')
const {abi:SwapRouterABI} = require('@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json')
const ERC20ABI = require('./abi.json')
require('dotenv').config()

const ALCHEMY_URL_TESTNET=process.env.ALCHEMY_URL_TESTNET
const WALLET_ADDRESS=process.env.WALLET_ADDRESS
const WALLET_SECRET_KEY=process.env.WALLET_SECRET_KEY

