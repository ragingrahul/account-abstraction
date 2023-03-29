import { NextPage } from "next";
import Image from "next/image";

interface Props {
  Symbol: string;
  Name: string;
  Balance: string;
  Class: string;
}

const Listing: NextPage<Props> = (props: Props) => {
  return (
    <div
      className={`flex h-[15%] w-[100%] bg-[#232323] items-center mt-6 justify-between ${props.Class}`}
    >
      <div className="flex flex-col justify-center">
        <h1 className="font-[GrayfelDemi] text-[#ffffff] ml-8 text-[1.75rem]">
          {props.Symbol}
        </h1>
        <h1 className="font-[GrayfelDemi] text-[#7f7f7f] ml-8 text-base">
          {props.Name}
        </h1>
      </div>
      <h1 className="font-[GrayfelDemi] text-[#ffffff] mr-8 text-[1.75rem]">
        {props.Balance}
      </h1>
    </div>
  );
};

export default Listing;
