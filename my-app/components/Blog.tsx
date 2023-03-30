import Image from "next/image";
import { NextPage } from "next";
import Listing from "./Listing";

interface Props {
  setIsLoading: (value: React.SetStateAction<boolean>) => void;
  title: string;
  desc: string;
  serial: string;
}

const Blog: NextPage<Props> = (props: Props) => {
  return (
    <>
      <div className="fixed top-0 left-0 h-[100vh] w-[100vw] bg-slate-900/10 backdrop-filter backdrop-blur-[20px] z-30 flex items-center justify-center">
        <div className="flex z-20 absolute top-0 left-0 w-[100vw] h-[15vh] bg-transparent items-center justify-between">
          <Image
            src="/Logo.png"
            height={387}
            width={986}
            alt="Logo"
            className="h-[48px] w-[160px] ml-[5vw]"
          />
          <div className="flex w-fit h-fit mr-[5vw] items-center">
            <Image
              src="/PoweredGelato.png"
              height={387}
              width={986}
              alt="Logo"
              className="h-[50px] w-[110px] ml-[10px]"
            />
          </div>
        </div>
        <div className="flex flex-col w-[50%] mr-[30vw]">
          <h1 className="font-[Cotta] text-5xl mb-10 mt-10">
            {"Blog #" + props.serial}
          </h1>
          <h1 className="font-[Cotta] text-8xl mb-10">{props.title}</h1>
          <h1 className="font-[GrayfelDemi] text-4xl">{props.desc}</h1>
          <div
            className="transition ease-linear duration-300  rounded-lg text-[#191919] p-3 px-4 w-[75px] mt-10 border-[#ff4848] bg-[#ff4848] z-50 hover:cursor-pointer border-[1px] hover:shadow-[#ff4848] hover:shadow-2xl"
            onClick={() => {
              props.setIsLoading(false);
            }}
          >
            <h1 className="font-[Sarabun] text-lg font-bold text-center text-[#ffffff]">
              Close
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
