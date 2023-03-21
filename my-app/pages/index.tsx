import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  GaslessOnboarding,
  GaslessWalletConfig,
  LoginConfig,
} from "@gelatonetwork/gasless-onboarding";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { SafeEventEmitterProvider, UserInfo } from "@web3auth/base";
import { GaslessWallet } from "@gelatonetwork/gasless-wallet";
import QRCode from "qrcode";

const inter = Inter({ subsets: ["latin"] });

const gaslessWalletConfig = {
  apiKey: process.env.NEXT_PUBLIC_ONEBALANCE_API_KEY,
};
const loginConfig = {
  domains: ["http://localhost:3000"],
  chain: {
    id: 5,
    rpcUrl: process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL,
  },
  openLogin: {
    redirectUrl: "http://localhost:3000",
  },
};

export default function Home() {
  const [gaslessOnboarding, setGaslessOnboarding] =
    useState<GaslessOnboarding>();
  const [web3AuthProvider, setWeb3AuthProvider] =
    useState<SafeEventEmitterProvider>();
  const [gaslessWallet, setGaslessWallet] = useState<GaslessWallet>();
  const [address, setAddress] = useState("");
  const [userInfo, setUserInfo] = useState<Partial<UserInfo> | null>();
  const [qrCode, setQRCode] = useState<string | null>();

  const login = async () => {
    try {
      const gaslessOnboarding = new GaslessOnboarding(
        loginConfig as LoginConfig,
        gaslessWalletConfig as GaslessWalletConfig
      );
      await gaslessOnboarding.init();

      const web3AuthProvider = await gaslessOnboarding.login();
      setWeb3AuthProvider(web3AuthProvider);
      setGaslessOnboarding(gaslessOnboarding);

      const gaslessWallet = gaslessOnboarding.getGaslessWallet();
      setGaslessWallet(gaslessWallet);

      const address = gaslessWallet.getAddress();
      setAddress(address);
      console.log(address);
      generateQRCode(address);

      const userInfo = await gaslessOnboarding.getUserInfo();
      setUserInfo(userInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const generateQRCode = (address: string) => {
    QRCode.toDataURL(address).then((url: string) => setQRCode(url));
  };

  const logout = async () => {
    await gaslessOnboarding?.logout();

    setGaslessOnboarding(undefined);
    setWeb3AuthProvider(undefined);
    setGaslessWallet(undefined);
    setAddress("");
  };

  return (
    <div>
      <div className="bg-[#191919] h-screen w-screen z-0">
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
            <div className="transition ease-linear duration-300  rounded-lg text-[#191919] p-3 px-4 border-[#06f2a8] bg-[#06f2a8] hover:cursor-pointer border-[1px] hover:shadow-[#06f2a8] hover:shadow-2xl">
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
            <div className="ml-[5vw] mt-[15vh]">
              <h1 className="text-[#ffffff] font-[Cotta] text-9xl">
                Join the new era of Digital Finance
              </h1>
              <h1 className="text-[#ffffff] font-[Sarabun] mt-10 text-2xl">
                Buying, trading & earning crypto was never been easier
              </h1>
              <div className="transition ease-linear duration-300 bg-[#191919] rounded-lg text-[#ffffff] hover:text-[#191919] p-3 px-4 w-fit mt-10 border-[#06f2a8] hover:bg-[#06f2a8] hover:cursor-pointer border-[1px]">
                <h1 className="font-[Sarabun] text-lg font-bold">
                  Get Started
                </h1>
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
            />
          </div>
        </div>
      </div>
      <div className="bg-[#191919] h-screen w-screen">
        <div className="absolute h-[100vh] w-[100vw] landing-page-2 z-0 left-[35vw] top-[90vh]"></div>
        <div className="flex z-20 relative">
          <div className="w-[30vw]">
            <Image
              src="/WalletRender.png"
              width={4000}
              height={2250}
              alt="Wallet"
              className="mt-[20vh] w-[60vw]  max-w-[100vw] -left-[7vw] relative"
            ></Image>
          </div>
          <div className="w-[70vw]">
            <div className="mr-[7vw] mt-[25vh] flex flex-col items-end">
              <h1 className="text-[#ffffff] font-[Cotta] text-9xl text-right">
                The all-in-one <br /> crypto wallet
              </h1>
              <h1 className="text-[#ffffff] font-[Sarabun] mt-10 text-2xl text-right">
                Ease of use & wide range of features packed in a single wallet
              </h1>
              <div className="transition ease-linear duration-300 bg-[#191919] rounded-lg text-[#ffffff] hover:text-[#191919] p-3 px-4 w-fit mt-10 border-[#06f2a8] hover:bg-[#06f2a8] hover:cursor-pointer border-[1px]">
                <h1 className="font-[Sarabun] text-lg font-bold">Learn More</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#191919] h-screen w-screen">
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
    </div>
  );
}
