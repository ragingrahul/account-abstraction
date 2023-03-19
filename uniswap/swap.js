const {ethers} = require('ethers')
const {abi:IUniswapV3PoolABI} =require('@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json')
const {abi:SwapRouterABI} = require('@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json')
const ERC20ABI = require('./abi.json')
require('dotenv').config()

const ALCHEMY_URL_TESTNET=process.env.ALCHEMY_URL_TESTNET
const WALLET_ADDRESS=process.env.WALLET_ADDRESS
const WALLET_SECRET_KEY=process.env.WALLET_SECRET_KEY

const poolAddress='0x4d1892f15B03db24b55E73F9801826a56d6f0755' 
const swapRouterAddress='0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'	

const chainId=5

const web3Provider=new ethers.providers.JsonRpcProvider(ALCHEMY_URL_TESTNET)

const name0='Wrapped Ether'
const symbol0='WETH'
const decimals0=18
const address0='0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'

const name1='Uniswap Token'
const symbol1='UNI'
const decimals1=18
const address1='0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'

async function main(){
    const poolContract=new ethers.Contract(
        poolAddress,
        IUniswapV3PoolABI,
        provider
    )

    const immutables= await getPoolImmutables(poolContract)
    const state=await getPoolState(poolContract)
}

main()