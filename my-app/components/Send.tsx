import { NextPage } from "next";
import Image from "next/image";
import Listing from "./Listing";
import { useState } from "react";
import Web3 from "web3";
import { SafeEventEmitterProvider } from "@web3auth/base";

interface Props {
  Class: string;
  web3AuthProvider: SafeEventEmitterProvider | undefined;
  setIsLoading: (value: React.SetStateAction<boolean>) => void;
  fromAddress: string;
}

const SendProp: NextPage<Props> = (props: Props) => {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  const sendTransaction = async () => {
    props.setIsLoading(true);
    const web3 = new Web3(props.web3AuthProvider as any);
    const weiAmount = web3.utils.toWei(amount, "ether");

    try {
      await web3.eth.sendTransaction({
        from: props.fromAddress,
        to: toAddress,
        value: weiAmount,
        maxPriorityFeePerGas: "5000000000",
        maxFeePerGas: "6000000000000",
      });
      const receipt = await web3.eth.signTransaction({
        from: props.fromAddress,
        to: toAddress,
        value: amount,
        maxPriorityFeePerGas: "5000000000", // Max priority fee per gas
        maxFeePerGas: "6000000000000", // Max fee per gas
      });
      console.log(receipt);
      props.setIsLoading(false);
    } catch (error) {
      console.log(error);
      props.setIsLoading(false);
    }
  };

  return (
    <>
      <h1
        className={`font-[GrayfelDemi] text-[#868686] text-center text-4xl mt-6 ${props.Class}`}
      >
        Send gETH
      </h1>
      <input
        className={`rounded-2xl w-[90%] h-[60px] text-2xl px-3 font-[GrayfelDemi] mt-6 ${props.Class} bg-[#232323] text-[#868686] placeholder:text-[#868686] focus:outline-none`}
        placeholder="Enter Recipient Address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <input
        className={`rounded-2xl w-[90%] h-[60px] text-2xl px-3 font-[GrayfelDemi] mt-6 ${props.Class} bg-[#232323] text-[#868686] placeholder:text-[#868686] focus:outline-none`}
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div
        className={` transition-shadow duration-300 ease-linear flex flex-col h-[15%] w-[90%] bg-[#06f2a8] rounded-2xl justify-center items-center hover:shadow-[#06f2a8] hover:shadow-2xl z-20 mt-6 ${props.Class}`}
        onClick={sendTransaction}
      >
        <h1 className="font-[GrayfelDemi] text-[#000000] text-4xl mt-2">
          Send
        </h1>
      </div>
    </>
  );
};

export default SendProp;
