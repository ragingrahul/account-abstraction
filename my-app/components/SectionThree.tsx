import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SectionThree: NextPage<Props> = (props: Props) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const comp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          scrub: true,
          end: "bottom 80%",
        },
      });
      tl.set(imageRef.current, {
        scale: 0,
        opacity: 0,
      });
      tl.to(imageRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1,
      });
      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: bodyRef.current,
          scrub: true,
          end: "bottom 80%",
        },
      });
      tl2.set(bodyRef.current, {
        x: "+10vw",
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
      className="bg-[#191919] min-h-[100vh] w-[100vw] snap-center"
      ref={comp}
    >
      <div className="absolute h-[100vh] w-[100vw] landing-page-2 z-0 left-[35vw] top-[300vh]"></div>
      <div className="absolute h-[100vh] w-[100vw] landing-page-2 z-0 left-[35vw] top-[300vh]"></div>
      <div className="flex z-20 relative">
        <div className="w-[30vw]">
          <Image
            src="/ConversionRender.png"
            width={4000}
            height={2250}
            alt="Wallet"
            className="mt-[20vh] w-[55vw]  max-w-[100vw] relative"
            ref={imageRef}
          ></Image>
        </div>
        <div className="w-[70vw]">
          <div
            className="mr-[7vw] mt-[30vh] flex flex-col items-end"
            ref={bodyRef}
          >
            <h1 className="text-[#ffffff] font-[Cotta] text-8xl text-right">
              Seemless Onboarding <br /> powered by Web3Auth
            </h1>
            <h1 className="text-[#ffffff] font-[Sarabun] mt-10 text-2xl text-right">
              Crypto for everyone - From curious to confident or from web2 to
              web3
            </h1>
            <div
              className="transition ease-linear duration-300 bg-[#191919] rounded-lg text-[#ffffff] hover:text-[#191919] p-3 px-4 w-fit mt-10 border-[#06f2a8] hover:bg-[#06f2a8] hover:cursor-pointer border-[1px]"
              onClick={() => {
                props.setIsLoading(true);
              }}
            >
              <h1 className="font-[Sarabun] text-lg font-bold">Learn More</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionThree;
