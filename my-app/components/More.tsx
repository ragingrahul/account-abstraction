import Image from "next/image";
import { NextPage } from "next";
import Listing from "./Listing";

interface Props {
  Class: string;
}

const MoreProp: NextPage<Props> = (props: Props) => {
  return (
    <>
      <div
        className={`transition-colors duration-300 flex h-[15%] w-[90%] bg-[#232323] items-center mt-6 rounded-3xl justify-between ${props.Class} hover:bg-[#3d3d3d] hover:cursor-pointer`}
        onClick={() => {
          window.location.href = "/more";
        }}
      >
        <div className="flex flex-col justify-center">
          <h1 className="font-[GrayfelDemi] text-[#ffffff] ml-8 text-[1.75rem]">
            Stake Tokens
          </h1>
          <h1 className="font-[GrayfelDemi] text-[#7f7f7f] ml-8 text-base">
            Stake your tokens to earn rewards
          </h1>
        </div>
      </div>
      <div
        className={`transition-colors duration-300 flex h-[15%] w-[90%] bg-[#232323] items-center mt-6 rounded-3xl justify-between ${props.Class} hover:bg-[#3d3d3d] hover:cursor-pointer`}
        onClick={() => {
          window.location.href = "/more";
        }}
      >
        <div className="flex flex-col justify-center">
          <h1 className="font-[GrayfelDemi] text-[#ffffff] ml-8 text-[1.75rem]">
            Range orders
          </h1>
          <h1 className="font-[GrayfelDemi] text-[#7f7f7f] ml-8 text-base">
            Set a range of prices to buy or sell
          </h1>
        </div>
      </div>
    </>
  );
};

export default MoreProp;
