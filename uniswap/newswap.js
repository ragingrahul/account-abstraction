const { abi: V3SwapRouterABI } = require('@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json')
const { abi: PeripheryPaymentsABI } = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/IPeripheryPayments.sol/IPeripheryPayments.json");
const { abi: MulticallABI } = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/IMulticall.sol/IMulticall.json");
const{ethers}=require('ethers')
require('dotenv').config()
const ERC20ABI = require('./abi.json')

const V3SwapRouterAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564'
const WETHAddress = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';
const USDCAddress = '0x07865c6E87B9F70255377e024ace6630C1Eaa37F';
const UNIADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';

const ALCHEMY_URL_TESTNET=process.env.ALCHEMY_URL_TESTNET
const WALLET_ADDRESS=process.env.WALLET_ADDRESS
const WALLET_SECRET_KEY=process.env.WALLET_SECRET_KEY

const swapRouterContract=new ethers.Contract(
    V3SwapRouterAddress,
    V3SwapRouterABI
)
const wethContract=new ethers.Contract(
    WETHAddress,
    ERC20ABI
)
const provider=new ethers.providers.JsonRpcProvider(ALCHEMY_URL_TESTNET)
const wallet=new ethers.Wallet(WALLET_SECRET_KEY)
const signer=wallet.connect(provider)

async function singleswap(){
    const deadline=Math.floor(Date.now()/1000)+(60*10)

    const params={
        tokenIn:WETHAddress,
        tokenOut:UNIADDRESS,
        fee:3000,
        recipient:WALLET_ADDRESS,
        deadline:deadline,
        amountIn:ethers.utils.parseEther('0.01'),
        amountOutMinimum:0,
        sqrtPriceLimitX96:0,
    }

    const encodedData=swapRouterContract.interface.encodeFunctionData("exactInputSingle",[params])

    const txArgs={
        to:V3SwapRouterAddress,
        from:WALLET_ADDRESS,
        data:encodedData,
        value:ethers.utils.parseEther('0.01'),
        gasLimit:ethers.utils.hexlify(1000000)
    }

    //const approvalAmount=(amountIn * 100000).toString()
    // const approveData=await wethContract.connect(signer).approve(
    //     V3SwapRouterAddress,
    //     20000000000
    // )
    const tx=await signer.sendTransaction(txArgs)
    console.log('tx',tx)
    const receipt= await tx.wait()
    console.log('receipt',receipt)
}

async function main(){
    await singleswap()
}
 
main()