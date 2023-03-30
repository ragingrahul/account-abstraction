import { NextPage } from "next";
import Image from "next/image";
import Listing from "./Listing";
import {
  GaslessOnboarding,
  GaslessWalletConfig,
  LoginConfig,
} from "@gelatonetwork/gasless-onboarding";
import { useEffect, useState, useRef, useLayoutEffect, Provider } from "react";
import { SafeEventEmitterProvider, UserInfo } from "@web3auth/base";
import { GaslessWallet } from "@gelatonetwork/gasless-wallet";
import { ethers } from "ethers";
const {
  abi: Quoter2Abi,
} = require("@uniswap/v3-periphery/artifacts/contracts/lens/QuoterV2.sol/QuoterV2.json");
import { dataStoreContract, dataStoreContractABI } from "@/constants";

interface Props {
  Class: string;
  gaslessOnboarding: GaslessOnboarding | undefined;
  web3AuthProvider: SafeEventEmitterProvider | undefined;
  gaslessWallet: GaslessWallet | undefined;
  address: string | undefined;
  userInfo: Partial<UserInfo> | null | undefined;
}

const WETH_ADDRESS = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";
const UNI_ADDRESS = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
const QUOTER2_ADDRESS = "0x61fFE014bA17989E743c5F6cB21bF9697530B21e";

const RangeProp: NextPage<Props> = (props: Props) => {
  const comp = useRef<HTMLDivElement>(null);
  const [givenValue, setGivenValue] = useState<string>();
  const [targetValue, setTargetValue] = useState<string>();
  const [uniPrice, setUniPrice] = useState<string>();
  const [deadline, setDeadline] = useState<string>();
  const [orderPlaced, setOrderPlaced] = useState<boolean>();
  const tokenIn = WETH_ADDRESS;
  const tokenOut = UNI_ADDRESS;
  const fee = "3000";
  const sqrtPriceLimitX96 = "0";

  const checkIfOrderPlaced = async () => {
    if (props.address && props.web3AuthProvider) {
      const newProvider = new ethers.providers.Web3Provider(
        props.web3AuthProvider
      );
      const contract = await new ethers.Contract(
        dataStoreContract,
        dataStoreContractABI,
        newProvider
      );
      let data = await contract.userData(props.address);
      let given = ethers.utils.formatUnits(data.givenvalue);
      if (given == "0.0") {
        setOrderPlaced(false);
      } else {
        setOrderPlaced(true);
      }
    }
  };

  const sendEth = async () => {
    try {
      if (givenValue) {
        const wei = ethers.utils.parseEther(givenValue);

        if (props.web3AuthProvider) {
          const provider = new ethers.providers.Web3Provider(
            props.web3AuthProvider
          );
          const signer = provider.getSigner();

          const tempaddress = await signer.getAddress();

          const balance = ethers.utils.formatEther(
            await provider.getBalance(tempaddress)
          );
          console.log(balance, tempaddress);
          let receiverAddress = "0x2160D41c9D711Ca3fA7777211148538eeb431970";
          let tx = {
            to: receiverAddress,
            value: wei,
          };
          signer.sendTransaction(tx).then((txObj) => {
            console.log("tx.hash:", txObj.hash);
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async () => {
    try {
      if (props.web3AuthProvider) {
        const provider = new ethers.providers.Web3Provider(
          props.web3AuthProvider
        );
        const signer = provider.getSigner();
        let address = await signer.getAddress();
        const contract = await new ethers.Contract(
          dataStoreContract,
          dataStoreContractABI,
          provider
        );
        let y = await contract.getMemberCount();
        y = ethers.utils.formatUnits(y);
        y = y * 10 ** 18;
        console.log(y);
        var index;
        for (let i = 0; i < y; i++) {
          let x = await contract.orderMembers(i);
          if (x === address) index = i;
        }
        let dataStore = new ethers.utils.Interface(dataStoreContractABI);
        let x = dataStore.encodeFunctionData("swapDone", [address, index]);
        console.log(x);

        const res = await props.gaslessWallet?.sponsorTransaction(
          dataStoreContract,
          x
        );
        console.log(res?.taskId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPrice = async () => {
    try {
      if (givenValue) {
        if (props.web3AuthProvider) {
          const provider = new ethers.providers.Web3Provider(
            props.web3AuthProvider
          );
          console.log(provider);

          const quoter2 = new ethers.Contract(
            QUOTER2_ADDRESS,
            Quoter2Abi,
            provider
          );
          console.log(quoter2);
          const params = {
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            fee: fee,
            amountIn: ethers.utils.parseEther(givenValue),
            sqrtPriceLimitX96: sqrtPriceLimitX96,
          };
          console.log(params);
          const output = await quoter2.callStatic.quoteExactInputSingle(params);
          setUniPrice(ethers.utils.formatUnits(output.amountOut.toString()));
          console.log(ethers.utils.formatUnits(output.amountOut.toString()));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const placeOrder = async () => {
    try {
      if (givenValue && targetValue && props.web3AuthProvider && deadline) {
        await sendEth();
        const provider = new ethers.providers.Web3Provider(
          props.web3AuthProvider
        );
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log(address);
        const date =
          Math.floor(Date.now() / 1000) + 60 * Number.parseInt(deadline);
        console.log(date);
        let dataStore = new ethers.utils.Interface(dataStoreContractABI);
        let x = dataStore.encodeFunctionData("swapStart", [
          ethers.utils.parseEther(givenValue),
          ethers.utils.parseEther(targetValue),
          address,
          date,
        ]);
        console.log(x);

        const res = await props.gaslessWallet?.sponsorTransaction(
          dataStoreContract,
          x
        );
        console.log(res?.taskId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(deadline);
    console.log(props.userInfo);
  }, []);

  useEffect(() => {
    getPrice();
    const intervalId = setInterval(() => {
      checkIfOrderPlaced();
    }, 1000 * 5);
    return () => clearInterval(intervalId);
  }, [givenValue]);

  return (
    <>
      {orderPlaced ? (
        <h1 className="text-[#868686] text-3xl font-medium pt-6 flex text-center font-[GrayfelDemi]">
          Order Placed, can't place another order now
        </h1>
      ) : (
        <>
          <h1
            className={`font-[GrayfelDemi] text-[#868686] text-center text-4xl mt-6 ${props.Class}`}
          >
            Place Range Order
          </h1>
          <input
            type="number"
            className={`rounded-2xl w-[90%] h-[60px] text-2xl px-3 font-[GrayfelDemi] mt-6 ${props.Class} bg-[#232323] text-[#868686] placeholder:text-[#868686] focus:outline-none`}
            placeholder="Enter Amount in ETH"
            onChange={(e) => {
              setGivenValue(e.target.value);
            }}
          />
          <div
            className={`rounded-2xl w-[90%] h-[60px] text-2xl px-3 font-[GrayfelDemi] mt-6 ${props.Class} bg-[#232323] text-[#868686] placeholder:text-[#868686] focus:outline-none flex items-center`}
          >
            {givenValue ? uniPrice : `Amount in UNI`}
          </div>
          <input
            className={`rounded-2xl w-[90%] h-[60px] text-2xl px-3 font-[GrayfelDemi] mt-6 ${props.Class} bg-[#232323] text-[#868686] placeholder:text-[#868686] focus:outline-none`}
            placeholder="Enter target amount in UNI"
            onChange={(e) => setTargetValue(e.target.value)}
          />
          <input
            className={`rounded-2xl w-[90%] h-[60px] text-2xl px-3 font-[GrayfelDemi] mt-6 ${props.Class} bg-[#232323] text-[#868686] placeholder:text-[#868686] focus:outline-none`}
            placeholder="Enter deadline in mins"
            onChange={(e) => setDeadline(e.target.value)}
          />
          <div
            className={` transition-shadow duration-300 ease-linear flex flex-col h-[10%] w-[90%] bg-[#06f2a8] rounded-2xl justify-center items-center hover:shadow-[#06f2a8] hover:shadow-2xl z-20 mt-6 ${props.Class}`}
          >
            <h1
              className="font-[GrayfelDemi] text-[#000000] text-4xl mt-2 hover:cursor-pointer"
              onClick={placeOrder}
            >
              Place Order
            </h1>
          </div>
          <div
            className={` transition-shadow duration-300 ease-linear flex flex-col h-[10%] w-[90%] bg-[#06f2a8] rounded-2xl justify-center items-center hover:shadow-[#06f2a8] hover:shadow-2xl z-20 mt-6 ${props.Class}`}
          >
            <h1
              className="font-[GrayfelDemi] text-[#000000] text-4xl mt-2 hover:cursor-pointer"
              onClick={cancelOrder}
            >
              Cancel Order
            </h1>
          </div>
        </>
      )}
    </>
  );
};

export default RangeProp;
