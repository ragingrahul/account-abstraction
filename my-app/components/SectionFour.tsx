import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

interface Props {
  login: () => void;
}

const SectionFour: NextPage<Props> = (props: Props) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const comp = useRef<HTMLDivElement>(null);
  const tower1Ref = useRef<HTMLImageElement>(null);
  const tower2Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          scrub: true,
          end: "bottom 20%",
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
          end: "bottom 50%",
        },
      });
      tl2.set(bodyRef.current, {
        scale: 0,
        opacity: 0,
      });
      tl2.to(bodyRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1,
      });
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: tower1Ref.current,
          scrub: true,
          end: "top 30%",
        },
      });
      tl3.set(tower1Ref.current, {
        scale: 0,
        opacity: 0,
      });
      tl3.to(tower1Ref.current, {
        scale: 1,
        opacity: 0.7,
        duration: 1,
      });
      const tl4 = gsap.timeline({
        scrollTrigger: {
          trigger: tower2Ref.current,
          scrub: true,
          end: "top 30%",
        },
      });
      tl4.set(tower2Ref.current, {
        scale: 0,
        opacity: 0,
      });
      tl4.to(tower2Ref.current, {
        scale: 1,
        opacity: 0.7,
        duration: 1,
      });
    }, comp);

    return () => ctx.revert();
  });

  return (
    <div
      className="bg-[#191919] min-h-[100vh] w-[100vw] snap-center overflow-hidden relative"
      ref={comp}
    >
      <div
        className="absolute h-[100vh] w-[100vw] landing-page-2 z-0"
        ref={imageRef}
      ></div>
      <div
        className="absolute h-[100vh] w-[100vw] landing-page-2 z-0"
        ref={imageRef}
      ></div>
      <Image
        src="/CoinTowerRender.png"
        width={1920}
        height={1080}
        alt="Logo"
        className="absolute w-[75vw] -left-[17vw] top-[30vh]"
        ref={tower1Ref}
      ></Image>
      <Image
        src="/CoinTowerRender.png"
        width={1920}
        height={1080}
        alt="Logo"
        className="absolute w-[75vw] left-[50vw] top-[40vh]"
        ref={tower2Ref}
      ></Image>
      <div className="flex flex-col justify-center items-center" ref={bodyRef}>
        <Image
          src="/Logo.png"
          width={1321}
          height={442}
          alt="Logo"
          className="h-[220px] w-[680px] mt-[30vh]"
        ></Image>
        <h1 className="text-[#ffffff] font-[Sarabun] mt-10 text-2xl text-center">
          If you&apos;ve been interested in trying web3, but have been hesitant{" "}
          <br />
          due to gas fees, Simpl wallet offers a solution.
        </h1>
        <div
          className="transition ease-linear duration-300  rounded-lg text-[#191919] p-3 mt-10  z-20 px-4 border-[#06f2a8] bg-[#06f2a8] hover:cursor-pointer border-[1px] hover:shadow-[#06f2a8] hover:shadow-2xl"
          onClick={props.login}
        >
          <h1 className="font-[Sarabun] text-lg font-bold">Connect</h1>
        </div>
      </div>
    </div>
  );
};

export default SectionFour;
