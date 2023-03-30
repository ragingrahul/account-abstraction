import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  GaslessOnboarding,
  GaslessWalletConfig,
  LoginConfig,
} from "@gelatonetwork/gasless-onboarding";
import { useEffect, useState, useRef } from "react";
import LandingWindow from "@/components/LandingWindow";
import SectionOne from "@/components/SectionOne";
import SectionTwo from "@/components/SectionTwo";
import SectionThree from "@/components/SectionThree";
import SectionFour from "@/components/SectionFour";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
import LoadingProp from "@/components/LoadingScreen";
import Blog from "@/components/Blog";
import { ONEBALANCE_API_KEY, ALCHEMY_RPC_URL } from "../constants";

const inter = Inter({ subsets: ["latin"] });

const gaslessWalletConfig = {
  apiKey: ONEBALANCE_API_KEY,
};
const loginConfig = {
  domains: [window.location.origin],
  chain: {
    id: 5,
    rpcUrl: ALCHEMY_RPC_URL,
  },
  openLogin: {
    redirectUrl: window.location.origin,
  },
};

export default function Home() {
  const [blog1IsLoading, setBlog1IsLoading] = useState(false);
  const [blog2IsLoading, setBlog2IsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const comp = useRef<HTMLDivElement>(null);

  const login = async () => {
    try {
      setIsLoading(true);

      const gaslessOnboarding = new GaslessOnboarding(
        loginConfig as LoginConfig,
        gaslessWalletConfig as GaslessWalletConfig
      );

      await gaslessOnboarding.init();

      await gaslessOnboarding.login();

      setIsLoading(false);

      window.location.href = "/wallet";
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      snap: {
        snapTo: 1 / 4,
        duration: 2,
      },
    });
  }, []);
  return (
    <div
      className="flex flex-col flex-nowrap h-fit w-[100vw] overflow-auto overflow-x-hidden"
      ref={comp}
    >
      <LandingWindow login={login} />
      <SectionOne setIsLoading={setBlog1IsLoading} />
      <SectionTwo login={login} />
      <SectionThree setIsLoading={setBlog2IsLoading} />
      <SectionFour login={login} />
      {blog1IsLoading && (
        <Blog
          setIsLoading={setBlog1IsLoading}
          serial="1"
          title="The problem Simpl wallet solves"
          desc="Simpl Wallet will allow users without eth to interact with ethereum
            using other tokens. Easy onboarding for early and existing users;
            users do not need to go through the hassle of buying eth before
            interacting with smart contracts. Initial payment not required to
            generate the smart address or use the wallet. No payment required,
            not now, not EVER! The smart wallet address only exist when a
            transaction is being performed"
        />
      )}
      {blog2IsLoading && (
        <Blog
          setIsLoading={setBlog2IsLoading}
          serial="2"
          title="Account Abstraction Will Change Web3 UX Forever"
          desc="Performing actions on the blockchain today is typically slow and tedious. Every time you want to write new information to the blockchain, you sign a transaction from your EOA to do so. Once you're familiar with the process, this becomes the standard experience. For new users, however, it's a nightmare."
        />
      )}
      <LoadingProp
        isLoading={isLoading}
        title="Signing In"
        desc="Processing sign in through Web3Auth"
        login={login}
        isLogin={true}
      />
    </div>
  );
}
