import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  GaslessOnboarding,
  GaslessWalletConfig,
  LoginConfig,
} from "@gelatonetwork/gasless-onboarding";
import { ethers } from "ethers";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { SafeEventEmitterProvider, UserInfo } from "@web3auth/base";
import { GaslessWallet } from "@gelatonetwork/gasless-wallet";
import QRCode from "qrcode";
import LandingWindow from "@/components/LandingWindow";
import SectionOne from "@/components/SectionOne";
import SectionTwo from "@/components/SectionTwo";
import SectionThree from "@/components/SectionThree";
import SectionFour from "@/components/SectionFour";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";

export default function Wallet() {
  return (
    <div className="bg-[#191919] h-fit min-h-[100vh] w-[100vw] snap-center">
      <div className="flex z-20 relative w-[100vw] h-[15vh] bg-transparent items-center justify-between">
        <Image
          src="/Logo.png"
          height={387}
          width={986}
          alt="Logo"
          className="h-[48px] w-[160px] ml-[5vw]"
        />
        <div className="flex w-fit h-fit mr-[5vw] items-center">
          <div className="transition ease-linear duration-300  rounded-lg text-[#191919] p-3 px-4 border-[#06f2a8] bg-[#06f2a8] hover:cursor-pointer border-[1px] hover:shadow-[#06f2a8] hover:shadow-2xl">
            <h1 className="font-[Sarabun] text-lg font-bold">Logout</h1>
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
      <div className="w-[100vw] h-fit flex justify-center">
        <div className="h-[725px] w-[440px] bg-[#000000] rounded-[2rem] border-[10px] border-[#232323] flex flex-col items-center">
          <div className="flex justify-center items-center px-4 my-3 py-1 rounded-full border-[2px] border-[#232323] hover:bg-[#232323]">
            <Image
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAACRUlEQVR4nO2ZP2gUQRTGtzHaxP+VIrYBG8HWQmxFCIRY2lkIiSktR9j5vjcD11xhcZaWtmqjaCGSKAgHgphGkJOkUFD0RMHC1ReXGGEvhNwmO7POwFfP95vvvXe3M1kWyOp0OkdF5ByAqwBuknwM4AOAbwBWALwg6fM8P5GFtKqMk3xPstiiPllrT8dofDM92DHjInJIRM5Yay8DcADuAnhTk/GiSgC+jG3cGHNwt41zE0VrnNsB0rIhaQC8bNro2EAApkgOmjZYJ9D9ndwYwA8AH0m+Jflaf08APCJ5D8AdkrcAdLW8ReQ6yWsArojIrLX2goic1xbQg8/z/KRWU6/X2zMSSOf6BgPfSa6WPfOK5FMAD8s+ug2gV25+QzcHsKC9Vm5+0Tl3Vjd3zp3y3h8zxuzLdnvxzyn+NMYcztqw+DedJ3rCxpj9WcyLATT4NnvzK4BnAOa73e7e6IH4r/rW2uNtAioUai2pAIzUqbm2AS21DWjYNqAiATGAFJgSYvMnnRJiGgpsvJyYhgKbP+H/JaGBiMx47ydVAKZJLscKNKi6Hiiv3gbRAYnIzKivbb2ciQ7Iez85CkjvP1oF5Jw7EB0QgOlRQAAuRQdEclkHQMVt1REA72IEKsqxPas9o9JkqmBiAiq2qgTEAFJgSojNn3RKiGkosPFyYhoKbEdCw6ZN1KjPCvQ8ACN1aUn/gs8HYKQuzWX6jKfPeQGYGVd9Y8zE2reFPrhGDtVffzTe8H0+oZFpHUYyKIYAFtXzejK/QX4Bn3Nvyfj72UYAAAAASUVORK5CYII="
              height={256}
              width={256}
              alt="WalletIcon"
              className="w-[20px] "
            ></Image>
            <h1 className="font-[GrayfelDemi] text-[#ffffff] ml-2">
              2dfe...dfj6
            </h1>
          </div>
          <div className="transition ease-linear duration-300 flex flex-col h-[25%] w-[90%] bg-[#06f2a8] rounded-2xl justify-center items-center hover:shadow-[#06f2a8] hover:shadow-2xl z-20">
            <h1 className="font-[GrayfelDemi] text-[#616161] text-[1.5rem] text-base">
              Total Balance
            </h1>
            <h1 className="font-[GrayfelDemi] text-[#000000] text-7xl mt-2">
              $8,567.17
            </h1>
          </div>
          <div className="flex h-[15%] w-[100%] bg-[#232323] items-center mt-6 justify-between">
            <div className="flex flex-col justify-center">
              <h1 className="font-[GrayfelDemi] text-[#ffffff] ml-8 text-[1.75rem]">
                gETH
              </h1>
              <h1 className="font-[GrayfelDemi] text-[#7f7f7f] ml-8 text-base">
                Goerli Ethereum
              </h1>
            </div>
            <h1 className="font-[GrayfelDemi] text-[#ffffff] mr-8 text-[1.75rem]">
              45.76 $
            </h1>
          </div>
          <div className="flex h-[15%] w-[100%] bg-[#232323] items-center mt-5 justify-between">
            <div className="flex flex-col justify-center">
              <h1 className="font-[GrayfelDemi] text-[#ffffff] ml-8 text-[1.75rem]">
                AVAX
              </h1>
              <h1 className="font-[GrayfelDemi] text-[#7f7f7f] ml-8 text-base">
                Avalanche
              </h1>
            </div>
            <h1 className="font-[GrayfelDemi] text-[#ffffff] mr-8 text-[1.75rem]">
              2565.23 $
            </h1>
          </div>
          <div className="flex flex-col flex-grow w-[100%] justify-end">
            <div className="bg-[#232323] h-[85px] w-[100%] flex justify-between ">
              <div className="flex flex-col items-center justify-center h-[100%] w-[25%] hover:scale-110 transition-all duration-300 ease-linear">
                <Image
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAACc0lEQVR4nO2ZP2gUURDGX5GZvRSeRq0UsRVsBFsLsRUhILG0sxD8U1pqqaWFRWwEz9uZbKGCmkLRQsQoCIIgphEkooU57nZmkwgWrr5dYoLciiabvH3rDkz9vt/7ZmbZecZUJbS7M0jo8IjSaRS6BkJPUHgehZZA+BMqvQKhK60l2mMqFUOF0xdUTv8uaQAL0QEPhRcnKD/cOOFxdwzi6CAInwThy6B8D5TflyEci13S9Qsf3Nm2+cK5ML0VjmsCirtjqHwRhd64FrpuINTuPhCecy2wNCBQerChhwt/Q+U+KH8A4Xf594Qfg/J9FI5Q6DooX7XljUoXUMJzoFOnMOEJlPBokIRHbAvYi2/1b+211WTSSfiDQzRYdfhXEP5sewaE3qLQMxB6ZPsIlW+i8GR+OF3KD6fzttfyw/nYiEaHsv5Lwv2ji+Euk95omc0OzEDou4mj7aYOgSvuPLU3bHqdtvE5sAINvsZcQOUXQcxnTTod1AEoXakuej26GO2uD5DmUJlTzoWUmEFMZ2oFhEozdQNKagbEaQOEFXABG4fU/U03DmkzFNh5OWEzFNT9Df8XDkG+xDlu5u9usYnK46A06yUQCM8NXQ/Yje2QbVXlgdA6U/S3bZczvgEZW2ZF0eu06wXUj7Z6B4TK40U8kEyd8A4IlGazbenvIbd3gPBH74BweWwnPJHtDHudtnVmGIw3QPgP2QBhBVzAxiF1f9ONQ9oMBXZeTtgMBa2FQ5S4FlFiigV6WQEhJSXNGPtG6V5IiQ9eJp0O7HOeazHlPElGmP1a2AdXr6Fk1aPxr0gjtJbZOvRjUFiN9Dwrs2VnfnL8AKJC8OsiybyiAAAAAElFTkSuQmCC"
                  height={256}
                  width={256}
                  alt="WalletIcon"
                  className="w-[24px] mt-2.5"
                ></Image>
                <h1 className="font-[GrayfelDemi] text-[#06f2a8] text-sm mt-2 ">
                  Wallet
                </h1>
              </div>
              <div className="flex flex-col items-center justify-center h-[100%] w-[25%] hover:scale-110 transition-all duration-300 ease-linear">
                <Image
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB6UlEQVR4nO2bv0ocURTGT9AmWAgpBbsUPoCNrVUCWhrSpbfzCabYe36zy7JvYGW5YJU3SGOZxjIQ0PgHLEUQQUemWJhC2c167+7c9fvgwFQD38edmd89547ZnBRC2AX+1FVf23tSWZbb7n4PVHW5+wPwxd6DQgibwO3IfKPugC1bZAGfgesXzI9Wwo27b9giqtfrrbn739fMN0I473Q667ZI6na7q8DvceYbIZwWRfHJFkGDweAj8GtS84066ff7K5azhsPhEnA8hfnRSvhZFMWy5aiqqj4Ah9Oab4RwVN/LcpO781bzjXLLScB+RPOjlXBgOcjdvwOPCQJ4An5YTohL/BDai8zhdcSNXe1DZsYgboKV0B5k7k2IuAlCmD8yd/8TcROEMD9kHkyPuLFr9sg8fCPiJlgJs0PmKhLiJghhNsjscRE3dnl2iEsuyOzu31IgboJ6LMtyL0UAVy0wN2n9ix4AcNkCY5M+BhfRAwgh7NY3zsE8sGPzFpGNWW5CAaAVgB4B9A5AL0H0FUCfQcQBCIQQCSIURnsBtBlCu0G0HUb9ANQQQR0h1BJDPUHUFEVdYdQWR3MBNBhBkyE0GkOzQTQcRdNhNB5H5wPQAQl0QoScj8i4+3nEAxJnlptCCF8jhXCW8jeZZ2EjcVy/P4NfAAAAAElFTkSuQmCC"
                  height={256}
                  width={256}
                  alt="WalletIcon"
                  className="w-[24px] mt-2.5 "
                ></Image>
                <h1 className="font-[GrayfelDemi] text-[#878787] text-sm mt-2">
                  Send
                </h1>
              </div>
              <div className="flex flex-col items-center justify-center h-[100%] w-[25%] hover:scale-110 transition-all duration-300 ease-linear">
                <Image
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB6UlEQVR4nO2bv0ocURTGT9AmWAgpBbsUPoCNrVUCWhrSpbfzCabYe36zy7JvYGW5YJU3SGOZxjIQ0PgHLEUQQUemWJhC2c167+7c9fvgwFQD38edmd89547ZnBRC2AX+1FVf23tSWZbb7n4PVHW5+wPwxd6DQgibwO3IfKPugC1bZAGfgesXzI9Wwo27b9giqtfrrbn739fMN0I473Q667ZI6na7q8DvceYbIZwWRfHJFkGDweAj8GtS84066ff7K5azhsPhEnA8hfnRSvhZFMWy5aiqqj4Ah9Oab4RwVN/LcpO781bzjXLLScB+RPOjlXBgOcjdvwOPCQJ4An5YTohL/BDai8zhdcSNXe1DZsYgboKV0B5k7k2IuAlCmD8yd/8TcROEMD9kHkyPuLFr9sg8fCPiJlgJs0PmKhLiJghhNsjscRE3dnl2iEsuyOzu31IgboJ6LMtyL0UAVy0wN2n9ix4AcNkCY5M+BhfRAwgh7NY3zsE8sGPzFpGNWW5CAaAVgB4B9A5AL0H0FUCfQcQBCIQQCSIURnsBtBlCu0G0HUb9ANQQQR0h1BJDPUHUFEVdYdQWR3MBNBhBkyE0GkOzQTQcRdNhNB5H5wPQAQl0QoScj8i4+3nEAxJnlptCCF8jhXCW8jeZZ2EjcVy/P4NfAAAAAElFTkSuQmCC"
                  height={256}
                  width={256}
                  alt="WalletIcon"
                  className="w-[24px] mt-2.5 rotate-180"
                ></Image>
                <h1 className="font-[GrayfelDemi] text-[#878787] text-sm mt-2">
                  Receive
                </h1>
              </div>
              <div className="flex flex-col items-center justify-center h-[100%] w-[25%] hover:scale-110 transition-all duration-300 ease-linear">
                <Image
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABSElEQVR4nO3YSUoDQRQG4L6BCuoh9DQOF3HYZ/WqGpKtA15OPYZulAdRRF0kxgp09/dBQRPCz6tQQ790HQAAAAAAAAAAAAAAAAAAQNd1tda9iDgvpVxGxEU+z2az3f/6cerA85uZz+eHpZSHiHgtpbx9HcvP7iPiYKr5TfV9fxwRz98L/2U85Xenlt9UrpwVi/+cxDoraT7w/OZy265R/MeWvptKflPLC+vHmbnCeOn7fmfs+c0t3xbWLf5jFZ2OPb+5Usr1BhO4Gnt+c1nEBhO4GHt+c7XWs79OoNZ6Mvb85rJDbHmJzQaevxXZIf5h+95MJb+5bEqyOVmj+MfFYrE/lfytyPZ8lUlk8RFxNLX8rchVkR1ino+/nZmllNtNVs5i4Plbk5dTNinLv3JznP7nhdUPPB8AAAAAAAAAAAAAAAAAAOgG7R1ObeEaj2l1DwAAAABJRU5ErkJggg=="
                  height={256}
                  width={256}
                  alt="WalletIcon"
                  className="w-[24px] mt-2.5 rotate-180"
                ></Image>
                <h1 className="font-[GrayfelDemi] text-[#878787] text-sm mt-2">
                  More
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
