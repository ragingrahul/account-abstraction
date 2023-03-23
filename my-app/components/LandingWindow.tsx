import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

interface Props {
  login: () => void;
}

const LandingWindow: NextPage<Props> = (props: Props) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const comp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.set(imageRef.current, {
        x: "+10vw",
        opacity: 0,
      });
      tl.to(imageRef.current, {
        x: "0vw",
        opacity: 1,
        duration: 1,
      });
      const tl2 = gsap.timeline();
      tl2.set(bodyRef.current, {
        x: "-10vw",
        opacity: 0,
      });
      tl2.to(bodyRef.current, {
        x: "0vw",
        opacity: 1,
        duration: 1,
      });
    }, comp);

    return () => ctx.revert();
  });

  return (
    <div
      className="bg-[#191919] min-h-[100vh] w-[100vw] z-0 snap-center"
      ref={comp}
    >
      <div className="absolute top-0 left-0 h-[100vh] w-[100vw] landing-page-1 z-0"></div>
      <div className="absolute top-0 left-0 h-[100vh] w-[100vw] landing-page-1 z-0"></div>
      <div className="flex z-20 relative w-[100vw] h-[15vh] bg-transparent items-center justify-between">
        <Image
          src="/Logo.png"
          height={387}
          width={986}
          alt="Logo"
          className="h-[48px] w-[160px] ml-[5vw]"
        />
        <div className="flex w-fit h-fit mr-[5vw] items-center">
          <div
            className="transition ease-linear duration-300  rounded-lg text-[#191919] p-3 px-4 border-[#06f2a8] bg-[#06f2a8] hover:cursor-pointer border-[1px] hover:shadow-[#06f2a8] hover:shadow-2xl"
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
      </div>
      <div className="flex z-20 relative">
        <div className="w-[70vw]">
          <div className="ml-[5vw] mt-[15vh]" ref={bodyRef}>
            <h1 className="text-[#ffffff] font-[Cotta] text-9xl">
              Join the new era of Digital Finance
            </h1>
            <h1 className="text-[#ffffff] font-[Sarabun] mt-10 text-2xl">
              Buying, trading & earning crypto was never been easier
            </h1>
            <div className="transition ease-linear duration-300 bg-[#191919] rounded-lg text-[#ffffff] hover:text-[#191919] p-3 px-4 w-fit mt-10 border-[#06f2a8] hover:bg-[#06f2a8] hover:cursor-pointer border-[1px]">
              <h1 className="font-[Sarabun] text-lg font-bold">Get Started</h1>
            </div>
          </div>
        </div>
        <div className="w-[30vw] flex">
          <Image
            src="/CoinRender.png"
            height={1080}
            width={1920}
            alt="BgImage"
            className="mt-[15vh] w-[50vw] max-w-[100vw] -left-[15vw] relative"
            ref={imageRef}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingWindow;
