const {ethers,BigNumber} = require('ethers')
const {abi:IUniswapV3PoolABI} =require('@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json')
const {abi:SwapRouterABI} = require('@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json')
const ERC20ABI = require('./abi.json')
require('dotenv').config()
const JSBI=require('jsbi')
const {AlphaRouter} = require('@uniswap/smart-order-router')
const {Token,CurrencyAmount,TradeType,Percent}=require('@uniswap/sdk-core')

const ALCHEMY_URL_TESTNET=process.env.ALCHEMY_URL_TESTNET
const WALLET_ADDRESS=process.env.WALLET_ADDRESS
const WALLET_SECRET_KEY=process.env.WALLET_SECRET_KEY

const poolAddress='0x4d1892f15B03db24b55E73F9801826a56d6f0755' 
const swapRouterAddress='0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'	

const chainId=5

const web3Provider=new ethers.providers.JsonRpcProvider(ALCHEMY_URL_TESTNET)
const router=new AlphaRouter({chainId:chainId,provider:web3Provider})

const name0='Wrapped Ether'
const symbol0='WETH'
const decimals0=18
const address0='0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'

const name1='Uniswap Token'
const symbol1='UNI'
const decimals1=18
const address1='0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'

const WETH=new Token(chainId,address0,decimals0,symbol0,name0)
const UNI=new Token(chainId,address1,decimals1,symbol1,name1)

const getWethContract=()=> new ethers.Contract(address0,ERC20ABI,web3Provider)
const getUniContract=()=> new ethers.Contract(address1,ERC20ABI,web3Provider)

const inputAmount=0.1
const slippageAmount=2
const deadline=10


const getPrice=async(inputAmount,slippageAmount,deadline,walletAddress)=>{
    const percentSlippage=new Percent(slippageAmount,100)
    const wei=ethers.utils.parseUnits(inputAmount.toString(),decimals0)
    const currencyAmount=CurrencyAmount.fromRawAmount(WETH,JSBI.BigInt(wei))
    
    const swapOptions={
        recipient:walletAddress,
        slippageAmount:percentSlippage,
        deadline:deadline
    }

    const route=await router.route(
        currencyAmount,
        UNI,
        TradeType.EXACT_INPUT,
        //swapOptions
    )

    // const transaction={
    //     data:route.methodParameters.calldata,
    //     to:swapRouterAddress,
    //     value:BigNumber.from(route.methodParameters.value),
    //     from:walletAddress,
    //     gasPrice:BigNumber.from(route.gasPriceWei),
    //     gasLimit:ethers.utils.hexlify(1000000)
    // }

    const quoteAmountOut=route.quote.toFixed(6)
    console.log(inputAmount,quoteAmountOut)
    const ratio=(inputAmount/quoteAmountOut).toFixed(3)
    console.log(ratio)

}



getPrice(inputAmount,slippageAmount,deadline,WALLET_ADDRESS)