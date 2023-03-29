import { NextPage } from "next";
import Image from "next/image";
import Listing from "./Listing";

interface Props {
  Class: string;
  address: string;
  balance: string;
  EthBalance: string;
  SimplBalance: string;
}

const WalletProp: NextPage<Props> = (props: Props) => {
  return (
    <>
      <div
        className={`flex justify-center items-center px-4 my-3 py-1 rounded-full border-[2px] border-[#232323] hover:bg-[#232323] ${props.Class} hover:cursor-pointer`}
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
          Total Balance
        </h1>
        <h1 className="font-[GrayfelDemi] text-[#000000] text-7xl mt-2">
          {props.balance.substring(0, 7)}
        </h1>
      </div>
      <Listing
        Symbol="gETH"
        Name="Goerli Ethereum"
        Balance={props.EthBalance.substring(0, 7)}
        Class={props.Class}
      />
      <Listing
        Symbol="SMPL"
        Name="Simpl Token"
        Balance={props.SimplBalance}
        Class={props.Class}
      />
      <Listing
        Symbol="UNI"
        Name="Uniswap Token"
        Balance={"0"}
        Class={props.Class}
      />
    </>
  );
};

export default WalletProp;
