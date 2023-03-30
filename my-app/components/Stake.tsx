import { NextPage } from "next";
import Image from "next/image";
import Listing from "./Listing";
import { stakeContract, stakeContractABI } from "../constants/index";
import { ethers, Signer } from "ethers";
import { useEffect, useState } from "react";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { GaslessWallet } from "@gelatonetwork/gasless-wallet";
import { parseEther } from "ethers/lib/utils";

interface Props {
  Class: string;
  address: string;
  web3AuthProvider: SafeEventEmitterProvider | undefined;
  gaslessWallet: GaslessWallet | undefined;
  setIsLoadingStake: (value: React.SetStateAction<boolean>) => void;
  setIsLoadingUnstake: (value: React.SetStateAction<boolean>) => void;
}

const StakeProp: NextPage<Props> = (props: Props) => {
  const [amount, setAmount] = useState("");
  const [stakeBalance, setStakeBalance] = useState("0");

  const getStakeBalance = async () => {
    if (props.web3AuthProvider == undefined) return;
    if (!props.address) return;
    try {
      const provider = new ethers.providers.Web3Provider(
        props.web3AuthProvider
      );
      const contract = new ethers.Contract(
        stakeContract,
        stakeContractABI,
        provider
      );
      const stakeInfo = await contract.stakingInfo(props.address);
      console.log(stakeInfo);
      const stakeBalance = stakeInfo.stakingBalance.toString();
      setStakeBalance(
        stakeBalance ? ethers.utils.formatUnits(stakeBalance).toString() : "0"
      );
    } catch (error) {
      console.log(error);
    }

    console.log(props.address);
  };

  const stakeToken = async () => {
    if (props.web3AuthProvider == undefined) return;
    if (props.address == undefined) return;

    try {
      props.setIsLoadingStake(true);
      const provider = new ethers.providers.Web3Provider(
        props.web3AuthProvider
      );
      const signer = provider.getSigner();

      let stake = new ethers.utils.Interface(stakeContractABI);
      let x = stake.encodeFunctionData("stakeTokens", [props.address]);
      console.log(x);

      const param = {
        to: stakeContract,
        from: props.address,
        data: x,
        value: parseEther(amount),
        gasLimit: ethers.utils.hexlify(1000000),
      };

      const tx = await signer.sendTransaction(param);
      console.log(tx);
      getStakeBalance();
      props.setIsLoadingStake(false);
    } catch (error) {
      console.log(error);
      props.setIsLoadingStake(false);
    }
  };

  const unstakeToken = async () => {
    if (props.web3AuthProvider == undefined) return;
    if (props.address == undefined) return;

    try {
      props.setIsLoadingUnstake(true);
      let stake = new ethers.utils.Interface(stakeContractABI);
      let x = stake.encodeFunctionData("unstakeTokens", [props.address]);
      console.log(x);

      const res = await props.gaslessWallet?.sponsorTransaction(
        stakeContract,
        x
      );

      console.log(res?.taskId);
      getStakeBalance();
      props.setIsLoadingUnstake(false);
    } catch (error) {
      console.log(error);
      props.setIsLoadingUnstake(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getStakeBalance();
    }, 1000 * 5);
    return () => clearInterval(intervalId);
  }, [props.web3AuthProvider, props.address]);

  return (
    <>
      <div
        className={`flex justify-center items-center px-4 my-3 py-1 rounded-full border-[2px] border-[#232323] hover:bg-[#232323] ${props.Class}`}
        onClick={() => {
          navigator.clipboard.writeText(props.address);
          alert("Copied your address to clipboard!");
        }}
      >
        <Image
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAACRUlEQVR4nO2ZP2gUQRTGtzHaxP+VIrYBG8HWQmxFCIRY2lkIiSktR9j5vjcD11xhcZaWtmqjaCGSKAgHgphGkJOkUFD0RMHC1ReXGGEvhNwmO7POwFfP95vvvXe3M1kWyOp0OkdF5ByAqwBuknwM4AOAbwBWALwg6fM8P5GFtKqMk3xPstiiPllrT8dofDM92DHjInJIRM5Yay8DcADuAnhTk/GiSgC+jG3cGHNwt41zE0VrnNsB0rIhaQC8bNro2EAApkgOmjZYJ9D9ndwYwA8AH0m+Jflaf08APCJ5D8AdkrcAdLW8ReQ6yWsArojIrLX2goic1xbQg8/z/KRWU6/X2zMSSOf6BgPfSa6WPfOK5FMAD8s+ug2gV25+QzcHsKC9Vm5+0Tl3Vjd3zp3y3h8zxuzLdnvxzyn+NMYcztqw+DedJ3rCxpj9WcyLATT4NnvzK4BnAOa73e7e6IH4r/rW2uNtAioUai2pAIzUqbm2AS21DWjYNqAiATGAFJgSYvMnnRJiGgpsvJyYhgKbP+H/JaGBiMx47ydVAKZJLscKNKi6Hiiv3gbRAYnIzKivbb2ciQ7Iez85CkjvP1oF5Jw7EB0QgOlRQAAuRQdEclkHQMVt1REA72IEKsqxPas9o9JkqmBiAiq2qgTEAFJgSojNn3RKiGkosPFyYhoKbEdCw6ZN1KjPCvQ8ACN1aUn/gs8HYKQuzWX6jKfPeQGYGVd9Y8zE2reFPrhGDtVffzTe8H0+oZFpHUYyKIYAFtXzejK/QX4Bn3Nvyfj72UYAAAAASUVORK5CYII="
          height={256}
          width={256}
          alt="WalletIcon"
          className="w-[20px] "
        ></Image>
        <h1 className="font-[GrayfelDemi] text-[#ffffff] ml-2">
          {props.address.substring(0, 4) +
            "..." +
            props.address.substring(
              props.address.length - 4,
              props.address.length
            )}
        </h1>
      </div>
      <div
        className={` transition-shadow duration-300 ease-linear flex flex-col h-[25%] w-[90%] bg-[#06f2a8] rounded-2xl justify-center items-center hover:shadow-[#06f2a8] hover:shadow-2xl z-20 ${props.Class}`}
      >
        <h1 className="font-[GrayfelDemi] text-[#616161] text-[1.5rem] text-base">
          Simpl Staked
        </h1>
        <h1 className="font-[GrayfelDemi] text-[#000000] text-7xl mt-2">
          {stakeBalance}
        </h1>
      </div>
      <input
        className={`rounded-2xl w-[90%] h-[60px] text-2xl px-3 font-[GrayfelDemi] mt-6 ${props.Class} bg-[#232323] text-[#868686] placeholder:text-[#868686] focus:outline-none`}
        placeholder="Enter Amount of SIMPL to Stake"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div
        className={` transition-shadow duration-300 ease-linear flex flex-col h-[10%] w-[90%] bg-[#06f2a8] rounded-2xl justify-center items-center hover:shadow-[#06f2a8] hover:shadow-2xl z-20 mt-6 ${props.Class}`}
        onClick={stakeToken}
      >
        <h1 className="font-[GrayfelDemi] text-[#000000] text-4xl mt-2">
          Buy Tokens
        </h1>
      </div>
      <div
        className={` transition-shadow duration-300 ease-linear flex flex-col h-[10%] w-[90%] bg-[#06f2a8] rounded-2xl justify-center items-center hover:shadow-[#06f2a8] hover:shadow-2xl z-20 mt-6 ${props.Class}`}
        onClick={unstakeToken}
      >
        <h1 className="font-[GrayfelDemi] text-[#000000] text-4xl mt-2">
          Unstake Tokens
        </h1>
      </div>
    </>
  );
};

export default StakeProp;
