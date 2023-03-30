import Image from "next/image";
import { NextPage } from "next";
import Listing from "./Listing";

interface Props {
  Class: string;
  address: string;
  qrUrl: string;
}

const RecieveProp: NextPage<Props> = (props: Props) => {
  return (
    <>
      <h1
        className={`font-[GrayfelDemi] text-[#868686] text-center text-4xl mt-6 ${props.Class}`}
      >
        Recieve gETH
      </h1>
      <div
        className={`h-[200px] w-[200px] bg-[#868686] my-6 rounded-2xl ${props.Class}`}
      >
        <Image
          src={props.qrUrl}
          width={200}
          height={200}
          alt="QR"
          className="rounded-2xl"
        />
      </div>
      <div
        className={`flex justify-center items-center px-6 py-1 rounded-full h-[50px] border-[2px] border-[#232323] hover:bg-[#232323] ${props.Class} hover:cursor-pointer`}
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
          Your Wallet{" "}
          <span className="text-[#868686]">
            {"(" +
              props.address.substring(0, 4) +
              "..." +
              props.address.substring(
                props.address.length - 4,
                props.address.length
              ) +
              ")"}
          </span>
        </h1>
      </div>
    </>
  );
};

export default RecieveProp;
