import { NextPage } from "next";
import Image from "next/image";

interface Props {
  isLoading: boolean;
  title: string;
  desc: string;
  login: () => void;
  isLogin: boolean;
}

const LoadingProp: NextPage<Props> = (props: Props) => {
  return (
    (props.isLoading && (
      <div className="fixed top-0 left-0 h-[100vh] w-[100vw] bg-slate-900/20 backdrop-filter backdrop-blur-[10px] z-30 flex items-center justify-center">
        <div className="flex z-20 absolute top-0 left-0 w-[100vw] h-[15vh] bg-transparent items-center justify-between">
          <Image
            src="/Logo.png"
            height={387}
            width={986}
            alt="Logo"
            className="h-[48px] w-[160px] ml-[5vw]"
          />
          {props.isLogin && (
            <div className="flex w-fit h-fit mr-[5vw] items-center">
              <div
                className="transition ease-linear duration-300  rounded-lg text-[#191919] p-3 px-4 border-[#06f2a8] bg-[#06f2a8] z-50 hover:cursor-pointer border-[1px] hover:shadow-[#06f2a8] hover:shadow-2xl"
                onClick={props.login}
              >
                <h1 className="font-[Sarabun] text-lg font-bold">Register</h1>
              </div>
              <Image
                src="/PoweredGelato.png"
                height={387}
                width={986}
                alt="Logo"
                className="h-[50px] w-[110px] ml-[10px]"
              />
            </div>
          )}
        </div>
        <div className="bg-[#131313] h-[195px] w-[550px] rounded-3xl border-[0.2px] border-[#4c4c4c] flex flex-col p-7 pt-5">
          <h1 className="text-[#ffffff] font-[GrayfelDemi] text-2xl">
            Loading Status
          </h1>
          <div className="bg-[#131313] h-[100px] w-[485px] mt-4 rounded-2xl border-[0.2px] border-[#4c4c4c] flex p-3 py-5 items-center">
            <img
              src="/loading.gif"
              width={50}
              height={50}
              alt="Loading"
              className="h-[60px] w-[60px]"
            />
            <div className="flex flex-col ml-4">
              <h1 className="text-[#ffffff] font-[GrayfelDemi] text-2xl">
                {props.title}
              </h1>
              <h1 className="text-[#9d9d9d] font-[GrayfelDemi] text-xl">
                {props.desc}
              </h1>
            </div>
          </div>
        </div>
      </div>
    )) || <></>
  );
};

export default LoadingProp;
