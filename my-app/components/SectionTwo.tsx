import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";

interface Props {}

const SectionTwo: NextPage<Props> = (props: Props) => {
  return (
    <div className="bg-[#191919] min-h-[100vh] w-[100vw] snap-center">
      <div className="absolute h-[100vh] w-[100vw] landing-page-2 z-0 -left-[25vw] top-[195vh]"></div>
      <div className="absolute h-[100vh] w-[100vw] landing-page-2 z-0 -left-[25vw] top-[195vh]"></div>
      <div className="flex z-20 relative">
        <div className="w-[70vw]">
          <div className="ml-[5vw] mt-[25vh]">
            <h1 className="text-[#ffffff] font-[Cotta] text-9xl">
              Gasless Wallets powered by Gelato
            </h1>
            <h1 className="text-[#ffffff] font-[Sarabun] mt-10 text-2xl">
              No need to go through the hassle of buying crypto before <br />
              interacting with smart contracts.
            </h1>
            <div className="transition ease-linear duration-300 bg-[#191919] rounded-lg text-[#ffffff] hover:text-[#191919] p-3 px-4 w-fit mt-10 border-[#06f2a8] hover:bg-[#06f2a8] hover:cursor-pointer border-[1px]">
              <h1 className="font-[Sarabun] text-lg font-bold">
                Connect Wallet
              </h1>
            </div>
          </div>
        </div>
        <div className="w-[30vw] flex">
          <Image
            src="/TextRender.png"
            height={1080}
            width={1920}
            alt="BgImage"
            className="mt-[25vh] w-[50vw] max-w-[100vw] -left-[10vw] relative"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
