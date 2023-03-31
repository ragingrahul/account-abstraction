import WalletProp from "@/components/Wallet";
import Image from "next/image";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import SendProp from "@/components/Send";
import RecieveProp from "@/components/Recieve";
import MoreProp from "@/components/More";
import { SafeEventEmitterProvider, UserInfo } from "@web3auth/base";
import { GaslessWallet } from "@gelatonetwork/gasless-wallet";
import QRCode from "qrcode";
import Web3 from "web3";
import {
  GaslessOnboarding,
  GaslessWalletConfig,
  LoginConfig,
} from "@gelatonetwork/gasless-onboarding";
import LoadingProp from "@/components/LoadingScreen";
import { BigNumber, ethers } from "ethers";
import { useContract, useTokenBalance } from "@thirdweb-dev/react";
import { ERC20ABI } from "../../Secret";
import { ONEBALANCE_API_KEY, ALCHEMY_RPC_URL } from "../../constants";

export default function Wallet() {
  const [menuToggle, setMenuToggle] = useState("wallet");
  const [gaslessOnboarding, setGaslessOnboarding] =
    useState<GaslessOnboarding>();
  const [web3AuthProvider, setWeb3AuthProvider] =
    useState<SafeEventEmitterProvider>();
  const [gaslessWallet, setGaslessWallet] = useState<GaslessWallet>();
  const [address, setAddress] = useState("");
  const [userInfo, setUserInfo] = useState<Partial<UserInfo> | null>();
  const [qrCode, setQRCode] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSend, setIsLoadingSend] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [balance, setBalance] = useState<string | null>();
  const [EthBalance, setEthBalance] = useState<string>();
  const [SimplBalance, setSimplBalance] = useState<string>();
  const [UniBalance, setUniBalance] = useState<string>();
  const { contract } = useContract(
    "0x2B8F9a05D88fBc5352885a15D241464b704b259A",
    "token"
  );

  //Get Balance gEth, Simpl and Uni
  const getBalance = async () => {
    if (!web3AuthProvider) return;

    const web3 = new Web3(web3AuthProvider as any);
    const provider = new ethers.providers.Web3Provider(web3AuthProvider);
    const address = (await web3.eth.getAccounts())[0];
    setAddress(address);

    if (!address) return;
    const uniContract = new ethers.Contract(
      "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      ERC20ABI,
      provider
    );
    const uniBalance = await uniContract.balanceOf(address);
    // let tempunibalance:string=ethers.utils.formatUnits(uniBalance.value)
    // let y:any=tempunibalance*(10**18)
    setUniBalance(
      ethers.utils.formatEther(uniBalance).toString().substring(0, 7)
    );

    const SimplBalance = await contract?.balanceOf(address);
    setSimplBalance(
      SimplBalance
        ? web3.utils.fromWei(SimplBalance?.value.toString()).toString()
        : "0"
    );
    console.log(SimplBalance?.value.toString());

    const EthBalance = web3.utils.fromWei(await web3.eth.getBalance(address));
    setEthBalance(EthBalance);

    const balance =
      EthBalance + ((SimplBalance?.value as any) / 20000).toString();
    setBalance(balance.toString());
  };

  useEffect(() => {
    if (!isLoading) {
      getBalance();
    }
  }, [isLoading]);

  //Login through web3Auth
  const login = async () => {
    try {
      if (typeof window === "undefined") throw new Error("window is undefined");
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
          redirectUrl: "",
        },
      };

      setIsLoading(true);

      const gaslessOnboarding = new GaslessOnboarding(
        loginConfig as LoginConfig,
        gaslessWalletConfig as GaslessWalletConfig
      );
      await gaslessOnboarding.init();

      const web3AuthProvider = await gaslessOnboarding.login();
      setWeb3AuthProvider(web3AuthProvider);
      setGaslessOnboarding(gaslessOnboarding);

      setIsLoading(false);

      const gaslessWallet = gaslessOnboarding.getGaslessWallet();
      setGaslessWallet(gaslessWallet);

      const web3 = new Web3(web3AuthProvider as any);
      const address = (await web3.eth.getAccounts())[0];
      setAddress(address);
      generateQRCode(address);

      const userInfo = await gaslessOnboarding.getUserInfo();
      setUserInfo(userInfo);
    } catch (error) {
      console.log(error);
      window.location.href = "/";
      setIsLoading(false);
    }
  };

  //Generate QR Code
  const generateQRCode = (address: string) => {
    QRCode.toDataURL(address).then((url: string) => setQRCode(url));
  };

  //Logout through web3Auth
  const logout = async () => {
    setIsLoadingLogout(true);
    await gaslessOnboarding?.logout();

    setGaslessOnboarding(undefined);
    setWeb3AuthProvider(undefined);
    setGaslessWallet(undefined);
    setAddress("");

    window.location.href = "/";
    setIsLoading(false);
  };

  useEffect(() => {
    login();
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.set(".active", { opacity: 0, scale: 0 });
    tl.to(".active", {
      opacity: 1,
      scale: 1,
      duration: 0.5,
    });
    const tl2 = gsap.timeline();
    tl2.set(".inactive", {
      opacity: 0,
      scale: 0,
    });
  }, [menuToggle]);

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
          <div
            className="transition ease-linear duration-300  rounded-lg text-[#191919] p-3 px-4 border-[#06f2a8] bg-[#06f2a8] hover:cursor-pointer border-[1px] hover:shadow-[#06f2a8] hover:shadow-2xl"
            onClick={logout}
          >
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
          {menuToggle === "wallet" && (
            <WalletProp
              Class={menuToggle === "wallet" ? "active" : "inactive"}
              address={address}
              EthBalance={EthBalance ? EthBalance : "0"}
              SimplBalance={SimplBalance ? SimplBalance : "0"}
              UniBalance={UniBalance ? UniBalance : "0"}
              balance={balance ? balance : "0"}
            />
          )}
          {menuToggle === "send" && (
            <SendProp
              Class={menuToggle === "send" ? "active" : "inactive"}
              web3AuthProvider={web3AuthProvider}
              setIsLoading={setIsLoadingSend}
              fromAddress={address}
            />
          )}
          {menuToggle === "recieve" && (
            <RecieveProp
              Class={menuToggle === "recieve" ? "active" : "inactive"}
              address={address}
              qrUrl={qrCode ? qrCode : ""}
            />
          )}
          {menuToggle === "more" && (
            <MoreProp Class={menuToggle === "more" ? "active" : "inactive"} />
          )}

          <div className="flex flex-col flex-grow w-[100%] justify-end">
            <div className="bg-[#232323] h-[85px] w-[100%] flex justify-between ">
              <div
                className="flex flex-col items-center justify-center h-[100%] w-[25%] hover:scale-110 transition-all duration-300 ease-linear"
                onClick={() => {
                  setMenuToggle("wallet");
                }}
              >
                <Image
                  src={
                    menuToggle === "wallet"
                      ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAACc0lEQVR4nO2ZP2gUURDGX5GZvRSeRq0UsRVsBFsLsRUhILG0sxD8U1pqqaWFRWwEz9uZbKGCmkLRQsQoCIIgphEkooU57nZmkwgWrr5dYoLciiabvH3rDkz9vt/7ZmbZecZUJbS7M0jo8IjSaRS6BkJPUHgehZZA+BMqvQKhK60l2mMqFUOF0xdUTv8uaQAL0QEPhRcnKD/cOOFxdwzi6CAInwThy6B8D5TflyEci13S9Qsf3Nm2+cK5ML0VjmsCirtjqHwRhd64FrpuINTuPhCecy2wNCBQerChhwt/Q+U+KH8A4Xf594Qfg/J9FI5Q6DooX7XljUoXUMJzoFOnMOEJlPBokIRHbAvYi2/1b+211WTSSfiDQzRYdfhXEP5sewaE3qLQMxB6ZPsIlW+i8GR+OF3KD6fzttfyw/nYiEaHsv5Lwv2ji+Euk95omc0OzEDou4mj7aYOgSvuPLU3bHqdtvE5sAINvsZcQOUXQcxnTTod1AEoXakuej26GO2uD5DmUJlTzoWUmEFMZ2oFhEozdQNKagbEaQOEFXABG4fU/U03DmkzFNh5OWEzFNT9Df8XDkG+xDlu5u9usYnK46A06yUQCM8NXQ/Yje2QbVXlgdA6U/S3bZczvgEZW2ZF0eu06wXUj7Z6B4TK40U8kEyd8A4IlGazbenvIbd3gPBH74BweWwnPJHtDHudtnVmGIw3QPgP2QBhBVzAxiF1f9ONQ9oMBXZeTtgMBa2FQ5S4FlFiigV6WQEhJSXNGPtG6V5IiQ9eJp0O7HOeazHlPElGmP1a2AdXr6Fk1aPxr0gjtJbZOvRjUFiN9Dwrs2VnfnL8AKJC8OsiybyiAAAAAElFTkSuQmCC"
                      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAAsTAAALEwEAmpwYAAACO0lEQVR4nO2ZP2gUQRTGtzHaRI1aKWIr2Ai2FmIrQiCcpZ2FkGhpOcLufr9ZuCuusDhLS1u1UbSQ4B8QDgTRRpATLRQMGlGw8PTllhjl7gjJJbuz7sCr5/u97723OzNRVJLVbDYPAKe89xeBa8ADSR8lfZP0DngGZHEcH47KtIYJBz4A/XXGUpIkx0MUPjIk3d0y4cAMcAI4D3jgFvB6EsIZDfRl08Kdc3u3WzhjIljhbATIykaSk/S8aKGbBkrT9CjQK1rgxICAO1u5saQfwCfgDfDSvieS7ku6DdwErgPtvLyvSLqUpukFoOG9PwOcthawxMdxfMSqqdPp7BgHtLRGwHfgfd4zL4BF4F7eRzeATr75VdscuJz3WgM4670/aZt7749lWXbQObcr2u7FIIs/W63WvqgKiz/uPLQMO+d2RyEvStDgG+zNr8ATYKHdbu8MHoi/o5skyaEqAfUNasWpEgiZWEiarxrQ40oBActVA+rXQJTABWqHKD7TtUPUQ4HCy4l6KFB8hv8Xh3rAXJZl0xZpms5KehUqUG/Y9UB+Y9sLEWhuzGm7ERxQlmXTo4Ds/qNSQN77PcEBpWk6OwboXHBAGkyzmX9hJO2X9DY4IAZh06xhPWNhzgyDCQmov96ogSiBC9QOUXyma4eohwKFlxP1UKAaDi0XLWKC8dl+8p6WQMhEn1MWKgQ0H9kznj3nFS1mAtF1zk2tnC3swTVwqO7qo/Ga8/mUWWZ1GMigMI2PTPOqM79BfgHjDYueDcddNQAAAABJRU5ErkJggg=="
                  }
                  height={256}
                  width={256}
                  alt="WalletIcon"
                  className="w-[24px] mt-2.5"
                ></Image>
                <h1
                  className={`font-[GrayfelDemi] ${
                    menuToggle === "wallet"
                      ? "text-[#06f2a8]"
                      : "text-[#878787]"
                  } text-sm mt-2`}
                >
                  Wallet
                </h1>
              </div>
              <div
                className="flex flex-col items-center justify-center h-[100%] w-[25%] hover:scale-110 transition-all duration-300 ease-linear"
                onClick={() => {
                  setMenuToggle("send");
                }}
              >
                <Image
                  src={
                    menuToggle === "send"
                      ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACC0lEQVR4nO2bsWpUURCGR3LPrEsKwVKwS5EHsLG1UtBSsUufLg9hniJVIPf8e8HKBxBsUtpYCoIxJiCEnXtJCIHkhA1xE5Alu3Fuds/m/2Fgq4V/mDP7nZmzIlOSGt6EGt8HMfgs90mdpnyhFo+1RroIw0mnX76U+6CiXz7TOjZD88OIh4VVz2We1elXS8Gw/6/5YSX80XprWeZR3cPySajxY6T5ywiGnYdH8anMlQ6qR2rx603mr1XCN+lXj2UulKquGr6Mbf6qJ2zL3uaiZK1ULQTDx8nNXx6HGp8kfS4kS6X0QA0btzV/LTYH3yW5KVhcdzD/tzF+kJxU1Fj1Mn/VGMs1yUGhwXs1nPonIJ4F661IVohbeydhhpG5GIm43jGDyNy5CXH9K2F2kLk7JuJ6x2wg88GEiOtfCVNE5nRbxHXvCVNA5vR/iOt+HO4UmZMb4nrH3SBzcERc90poG5mLNhA3F2QOTe9dK4jrngCcaoO3/gmwuDd1c2MfhfirhQTgdz4JwG47iwzDbg7m1eJr9wRMKm9jkpuUCQArQHkEwB6gbILgr4DyZxDkACUIgSSoRGHwLqC8DIG3QeV1GJwHKAci4ERIORIDZ4LKoSg4FVaOxcG9gHIxAm6GlKsxcDeoXI6C22Hlehx8H6B8IAG+ENGcn8gEw47jw6efkpvU4iuPJAzMt/k3mXOaPrwWcFDVmQAAAABJRU5ErkJggg=="
                      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB6UlEQVR4nO2bv0ocURTGT9AmWAgpBbsUPoCNrVUCWhrSpbfzCabYe36zy7JvYGW5YJU3SGOZxjIQ0PgHLEUQQUemWJhC2c167+7c9fvgwFQD38edmd89547ZnBRC2AX+1FVf23tSWZbb7n4PVHW5+wPwxd6DQgibwO3IfKPugC1bZAGfgesXzI9Wwo27b9giqtfrrbn739fMN0I473Q667ZI6na7q8DvceYbIZwWRfHJFkGDweAj8GtS84066ff7K5azhsPhEnA8hfnRSvhZFMWy5aiqqj4Ah9Oab4RwVN/LcpO781bzjXLLScB+RPOjlXBgOcjdvwOPCQJ4An5YTohL/BDai8zhdcSNXe1DZsYgboKV0B5k7k2IuAlCmD8yd/8TcROEMD9kHkyPuLFr9sg8fCPiJlgJs0PmKhLiJghhNsjscRE3dnl2iEsuyOzu31IgboJ6LMtyL0UAVy0wN2n9ix4AcNkCY5M+BhfRAwgh7NY3zsE8sGPzFpGNWW5CAaAVgB4B9A5AL0H0FUCfQcQBCIQQCSIURnsBtBlCu0G0HUb9ANQQQR0h1BJDPUHUFEVdYdQWR3MBNBhBkyE0GkOzQTQcRdNhNB5H5wPQAQl0QoScj8i4+3nEAxJnlptCCF8jhXCW8jeZZ2EjcVy/P4NfAAAAAElFTkSuQmCC"
                  }
                  height={256}
                  width={256}
                  alt="WalletIcon"
                  className="w-[24px] mt-2.5 "
                ></Image>
                <h1
                  className={`font-[GrayfelDemi] ${
                    menuToggle === "send" ? "text-[#06f2a8]" : "text-[#878787]"
                  } text-sm mt-2`}
                >
                  Send
                </h1>
              </div>
              <div
                className="flex flex-col items-center justify-center h-[100%] w-[25%] hover:scale-110 transition-all duration-300 ease-linear"
                onClick={() => {
                  setMenuToggle("recieve");
                }}
              >
                <Image
                  src={
                    menuToggle === "recieve"
                      ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACC0lEQVR4nO2bsWpUURCGR3LPrEsKwVKwS5EHsLG1UtBSsUufLg9hniJVIPf8e8HKBxBsUtpYCoIxJiCEnXtJCIHkhA1xE5Alu3Fuds/m/2Fgq4V/mDP7nZmzIlOSGt6EGt8HMfgs90mdpnyhFo+1RroIw0mnX76U+6CiXz7TOjZD88OIh4VVz2We1elXS8Gw/6/5YSX80XprWeZR3cPySajxY6T5ywiGnYdH8anMlQ6qR2rx603mr1XCN+lXj2UulKquGr6Mbf6qJ2zL3uaiZK1ULQTDx8nNXx6HGp8kfS4kS6X0QA0btzV/LTYH3yW5KVhcdzD/tzF+kJxU1Fj1Mn/VGMs1yUGhwXs1nPonIJ4F661IVohbeydhhpG5GIm43jGDyNy5CXH9K2F2kLk7JuJ6x2wg88GEiOtfCVNE5nRbxHXvCVNA5vR/iOt+HO4UmZMb4nrH3SBzcERc90poG5mLNhA3F2QOTe9dK4jrngCcaoO3/gmwuDd1c2MfhfirhQTgdz4JwG47iwzDbg7m1eJr9wRMKm9jkpuUCQArQHkEwB6gbILgr4DyZxDkACUIgSSoRGHwLqC8DIG3QeV1GJwHKAci4ERIORIDZ4LKoSg4FVaOxcG9gHIxAm6GlKsxcDeoXI6C22Hlehx8H6B8IAG+ENGcn8gEw47jw6efkpvU4iuPJAzMt/k3mXOaPrwWcFDVmQAAAABJRU5ErkJggg=="
                      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB6UlEQVR4nO2bv0ocURTGT9AmWAgpBbsUPoCNrVUCWhrSpbfzCabYe36zy7JvYGW5YJU3SGOZxjIQ0PgHLEUQQUemWJhC2c167+7c9fvgwFQD38edmd89547ZnBRC2AX+1FVf23tSWZbb7n4PVHW5+wPwxd6DQgibwO3IfKPugC1bZAGfgesXzI9Wwo27b9giqtfrrbn739fMN0I473Q667ZI6na7q8DvceYbIZwWRfHJFkGDweAj8GtS84066ff7K5azhsPhEnA8hfnRSvhZFMWy5aiqqj4Ah9Oab4RwVN/LcpO781bzjXLLScB+RPOjlXBgOcjdvwOPCQJ4An5YTohL/BDai8zhdcSNXe1DZsYgboKV0B5k7k2IuAlCmD8yd/8TcROEMD9kHkyPuLFr9sg8fCPiJlgJs0PmKhLiJghhNsjscRE3dnl2iEsuyOzu31IgboJ6LMtyL0UAVy0wN2n9ix4AcNkCY5M+BhfRAwgh7NY3zsE8sGPzFpGNWW5CAaAVgB4B9A5AL0H0FUCfQcQBCIQQCSIURnsBtBlCu0G0HUb9ANQQQR0h1BJDPUHUFEVdYdQWR3MBNBhBkyE0GkOzQTQcRdNhNB5H5wPQAQl0QoScj8i4+3nEAxJnlptCCF8jhXCW8jeZZ2EjcVy/P4NfAAAAAElFTkSuQmCC"
                  }
                  height={256}
                  width={256}
                  alt="WalletIcon"
                  className="w-[24px] mt-2.5 rotate-180"
                ></Image>
                <h1
                  className={`font-[GrayfelDemi] ${
                    menuToggle === "recieve"
                      ? "text-[#06f2a8]"
                      : "text-[#878787]"
                  } text-sm mt-2`}
                >
                  Receive
                </h1>
              </div>
              <div
                className="flex flex-col items-center justify-center h-[100%] w-[25%] hover:scale-110 transition-all duration-300 ease-linear"
                onClick={() => {
                  setMenuToggle("more");
                }}
              >
                <Image
                  src={
                    menuToggle === "more"
                      ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABZElEQVR4nO3YTWrbQBgGYG08myySgpNDtKeJm4u47VXyQ5cBS0IbHynpBexosmo3CeNC/iG2kzFIeh4YMMa8fJ+YH4+KAgAAAAAAAAAAAAAAAAAAILmZfQmxPAlt9SO05TR9Lpbzg097ODcdz89l7/byKLTV79DW/0Ks756N9F1bXRSxORxqflaj2/LbKFZ/XhX+YoxifZ1+O7T8rNLMWaf4p01sMpP2Op6f3WrZrln845KuzoeSn1c6sN7aM99v4G+xaPZ7n5/b6t/CpsU/jGrS9/zsQlv92rqBtv7Z9/zsUhHbN1BO+56fXYj19+2XcHnc9/z8lvODrIfYsuP5u5BuiFs0cDqU/Pxic5guJ+sWP4r1VRFn48Hk78L/q/z7TaTiQ2y+Di1/N+JsnG6IaX98a88MbX32oZkTO56/M4tmP11SVq9yV69zq8mnHliLjucDAAAAAAAAAAAAAAAAAABFl90Dyg0BJ05hj9MAAAAASUVORK5CYII="
                      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAABSElEQVR4nO3YSUoDQRQG4L6BCuoh9DQOF3HYZ/WqGpKtA15OPYZulAdRRF0kxgp09/dBQRPCz6tQQ790HQAAAAAAAAAAAAAAAAAAQNd1tda9iDgvpVxGxEU+z2az3f/6cerA85uZz+eHpZSHiHgtpbx9HcvP7iPiYKr5TfV9fxwRz98L/2U85Xenlt9UrpwVi/+cxDoraT7w/OZy265R/MeWvptKflPLC+vHmbnCeOn7fmfs+c0t3xbWLf5jFZ2OPb+5Usr1BhO4Gnt+c1nEBhO4GHt+c7XWs79OoNZ6Mvb85rJDbHmJzQaevxXZIf5h+95MJb+5bEqyOVmj+MfFYrE/lfytyPZ8lUlk8RFxNLX8rchVkR1ino+/nZmllNtNVs5i4Plbk5dTNinLv3JznP7nhdUPPB8AAAAAAAAAAAAAAAAAAOgG7R1ObeEaj2l1DwAAAABJRU5ErkJggg=="
                  }
                  height={256}
                  width={256}
                  alt="WalletIcon"
                  className="w-[24px] mt-2.5 rotate-180"
                ></Image>
                <h1
                  className={`font-[GrayfelDemi] ${
                    menuToggle === "more" ? "text-[#06f2a8]" : "text-[#878787]"
                  } text-sm mt-2`}
                >
                  More
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingProp
        isLoading={isLoading}
        title="Signing In"
        desc="Processing sign in through Web3Auth"
        login={login}
        isLogin={true}
      />
      <LoadingProp
        isLoading={isLoadingSend}
        title="Sending"
        desc="Sending Transaction to the destination"
        login={login}
        isLogin={false}
      />
      <LoadingProp
        isLoading={isLoadingLogout}
        title="Logging Out"
        desc="Logging out from Web3Auth"
        login={login}
        isLogin={false}
      />
    </div>
  );
}
