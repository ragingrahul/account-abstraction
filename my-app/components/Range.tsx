import { NextPage } from "next";
import Image from "next/image";
import Listing from "./Listing";

interface Props {
  Class: string;
}

const RangeProp: NextPage<Props> = (props: Props) => {
  return (
    <>
      <h1
        className={`font-[GrayfelDemi] text-[#868686] text-center text-4xl mt-6 ${props.Class}`}
      >
        Place Range Order
      </h1>
      <input
        className={`rounded-2xl w-[90%] h-[60px] text-2xl px-3 font-[GrayfelDemi] mt-6 ${props.Class} bg-[#232323] text-[#868686] placeholder:text-[#868686] focus:outline-none`}
        placeholder="Enter Amount"
      />
      <input
        className={`rounded-2xl w-[90%] h-[60px] text-2xl px-3 font-[GrayfelDemi] mt-6 ${props.Class} bg-[#232323] text-[#868686] placeholder:text-[#868686] focus:outline-none`}
        placeholder="Enter Lower Limit"
      />
      <input
        className={`rounded-2xl w-[90%] h-[60px] text-2xl px-3 font-[GrayfelDemi] mt-6 ${props.Class} bg-[#232323] text-[#868686] placeholder:text-[#868686] focus:outline-none`}
        placeholder="Enter Upper Limit"
      />
      <div
        className={` transition-shadow duration-300 ease-linear flex flex-col h-[15%] w-[90%] bg-[#06f2a8] rounded-2xl justify-center items-center hover:shadow-[#06f2a8] hover:shadow-2xl z-20 mt-6 ${props.Class}`}
      >
        <h1 className="font-[GrayfelDemi] text-[#000000] text-4xl mt-2">
          Place Order
        </h1>
      </div>
    </>
  );
};

export default RangeProp;
