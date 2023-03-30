import WalletProp from "@/components/Wallet";
import Image from "next/image";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import StakeProp from "@/components/Stake";
import RangeProp from "@/components/Range";
import {
  GaslessOnboarding,
  GaslessWalletConfig,
  LoginConfig,
} from "@gelatonetwork/gasless-onboarding";
import { SafeEventEmitterProvider, UserInfo } from "@web3auth/base";
import { GaslessWallet } from "@gelatonetwork/gasless-wallet";
import { ethers } from "ethers";
import Web3 from "web3";
import LoadingProp from "@/components/LoadingScreen";
import { ONEBALANCE_API_KEY, ALCHEMY_RPC_URL } from "../../constants";

export default function Wallet() {
  const [menuToggle, setMenuToggle] = useState("stake");
  const [gaslessOnboarding, setGaslessOnboarding] =
    useState<GaslessOnboarding>();
  const [web3AuthProvider, setWeb3AuthProvider] =
    useState<SafeEventEmitterProvider>();
  const [gaslessWallet, setGaslessWallet] = useState<GaslessWallet>();
  const [address, setAddress] = useState("");
  const [userInfo, setUserInfo] = useState<Partial<UserInfo> | null>();
  const [qrCode, setQRCode] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStake, setIsLoadingStake] = useState(false);
  const [isLoadingRange, setIsLoadingRange] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [isLoadingUnstake, setIsLoadingUnstake] = useState(false);

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
      console.log(address);

      const userInfo = await gaslessOnboarding.getUserInfo();
      setUserInfo(userInfo);
    } catch (error) {
      console.log(error);
      window.location.href = "/";
      setIsLoading(false);
    }
  };
  useEffect(() => {
    login();
  }, []);

  const logout = async () => {
    setIsLoadingLogout(true);
    await gaslessOnboarding?.logout();

    setGaslessOnboarding(undefined);
    setWeb3AuthProvider(undefined);
    setGaslessWallet(undefined);
    setAddress("");

    window.location.href = "/";
  };

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
          {menuToggle === "stake" && (
            <StakeProp
              Class={menuToggle === "stake" ? "active" : "inactive"}
              address={address}
              web3AuthProvider={web3AuthProvider}
              gaslessWallet={gaslessWallet}
              setIsLoadingStake={setIsLoadingStake}
              setIsLoadingUnstake={setIsLoadingUnstake}
            />
          )}
          {menuToggle === "range" && (
            <RangeProp
              Class={menuToggle === "range" ? "active" : "inactive"}
              gaslessOnboarding={gaslessOnboarding}
              web3AuthProvider={web3AuthProvider}
              gaslessWallet={gaslessWallet}
              address={address}
              userInfo={userInfo}
            />
          )}

          <div className="flex flex-col flex-grow w-[100%] justify-end">
            <div className="bg-[#232323] h-[85px] w-[100%] flex justify-between ">
              <div
                className="flex flex-col items-center justify-center h-[100%] w-[33%] hover:scale-110 transition-all duration-300 ease-linear"
                onClick={() => {
                  setMenuToggle("stake");
                }}
              >
                <Image
                  src={
                    menuToggle === "stake"
                      ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADs0lEQVR4nO1ZPWgUURB+xn2zMbERLCxERfAXO1EERVALERVsLNRCRPEXEwVLIWKljT+N2CnRu5msXQQ7f8BoIfEHRbATSWIMicnOnJoo6MrbM7pnTLL7di93kXwwcMXdvPne9+bNvDmlpjCF/xPAeFULvtFCl7TvrVSTEY7vrQahIGqa8Z4jtF5NJoDQ6b+JwLAxeUpys9VkADA+GJWIhOp0Oj6tUlWN7uZ6YPw6FhEIlcEvwPmtqloBjFvGJSG/yQy5Pm0uc0DeEmA6AYJ5YHwBTL1mYbOTmqkDmJ5pbtn79++00IXYRMQYCkhuabbRdzfXO0JHgfFVzCAKIzcAXyYjQiZnXqvgWm16AoE33ZGWw5qxO1EAgu+ibuo+eXOA8UdSIlAkcyYVB9fPLQTGhzaLAxNFfWmf9lj5kdDXYG2/N8+KhCO0Njz71otjY9QfCF639iWhwhcTkwChHbGuyTHMYVpToghjZxp/YHIuuO/EJuEWcFN4A6VZlHFIBXfciBrL0pGgQAu9VUEwLRaJ2v6b80GwL+2iIPi4RGHON1gTYOrQTOdmfL4xN54UQVONCSA9iXD3LkRda8HWhBshJqfM6TBxqSRwhA5lQSK0Au38s0H3HRDi8Y8jfQfGNi14UPV4M5UVulrrNFNPVkSiV6Uj3rpx8uk5cP6kqTMqLVyfjmdFQjN1RX2bYjbyO9ipGc/rAq1QWSJ+2xGLyK0S30KPfu38F/PeAKbtia7RuADxlmeWG8WAT/123t1cr4Vum6puPo8VhzuACxzBI1roQOIED4kwNmZJxORErIWDYJp5r2ums2EHXeKDDlkQIcpODfqmAm/G6MF7YN4YwHQlbPdH9YU3LIiU7kY6wycjFvBzs7SPu4GxJdY1LOHxfJGciODHzBJd6PJwh2DqgckPm55NM/XYKJKqOSwNAO9lojDjUEWJZGZMgxU9WtkpSx8sFKFnlQ4cRh6t55W9fjMzTH79mmpafYrkG5IrIrml1Uckt0jZwMyOqocEJi+GwzBzq4oTkKKFD6tUw+UquIa1ect0tdbZE6mSpNeC+1VqmOEDY1sF1bhr9Q4ZdcouODDxRLDPNJoqS5j/8lIP6JIY41e3QBtUOaD9ll0T0kwyDQLjNlVOuIX8xrIeM6besinx75z5NQXJ9jg9iD8CzQpBU02xYKavM5rpvWbaF3sYXRZ0tdaZ6YZdO4PtYcWOTOirAsC4OFQpfALgU/MQAqF+Y8W/6LAdBG+6hfwx6wZwClNQFcNPR0uP0oLqHDUAAAAASUVORK5CYII="
                      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADWUlEQVR4nO2ZO2gUURSGRw2+G8HCQlQENYqdKIIiqIWICjYWaiGimEQxUbAUJmzu/98xL91GLAMRiWuntSHgoxA1QRHsRJIYgy80YBJBR447wWFINjN37jobyQ8Htpg993xzH+fcM44zq1n9nyJ5g+Rrkte01lucmSil1DaSfsS6tda7nJkkAJcnAfHFABRaW1uXOzNBJHumAmHRBkhudSpZLS0tS0iOTwPiA/iulDrgVKqUUvung+BfmDGl1L6yBpTL5TaQvADgFoA+AB9kYHmTAPoBPCd5Ivo/ku1xQViE+QaguhzL4izJlzEDGYn6APAiCQiL9sp13YWpAQqFwjyStQCGEr7Nt2E/zc3NKwD8MgDxATSmgtBarwXwwHDwrrAvksdN/LBoo57nrTKCALBD1r7p4AAaIv46UoD4AK6aQByOc0yWMqXU9siMDKTxR3LEdd2qJBB75QRK+fbG8vn8ggmfnudtTAnhA3jj+/6cWBBNTU2rAXy0MOjjyGzUp/DVD8DzPG9lLAjXdedKAGkhAmuPgNw1yB8dsjokLieJANRYgvC11kdCL6iK5NcY//tJ8qHW+ozruksTBR8abDGAYVsg4aPS87yd0zzfC+Ci5Bmj4COzcd4WBIDBiO/GSZ6TE+wKgM2OTSUoO+LYnYjvRwGg1GEFpdShRMdoXAHYZBFC7FK4PgNwT7K6/C4Vh9Z6DYA6rfXpxBs8AGmwCSJ7Is64khPkvg4gJxV0ZHnWmIB0WdwfP9ra2hZNNZbruvPljkHyuuSHEr46TUD6LII8ifrXWi8DcIzk7ZjHsC8xJQYh+ckiSH6iQpB8EOyPxDUbgGETkFTFYcS6bcwwgLGsQWzZaKZLy6K9TwwSNAr8CrPeTI9fi9ZpAlJXAYH7Eas3AamugMD9sOVyuXWOiaR3lHXwTJMMQyC1WQMwMEmkabuImR/DAAblkuekUSVsegCnnLSSO4DcmTOEuG90DynRZf+SAcRHKTQdm5JveWkbdAltHMBupxwiefQfFZOjJA865ZTWek85l1nwcag8MzHFnvnTBbFsPbFboLYUnGa1lvLMO5InYzejy6GgG1ljUs4AeCoZO9yhrwiRXB98jpMrwDO5CAH4HNiQBA7gJoBzxgXgrGblZKbfqChOehhr1zkAAAAASUVORK5CYII="
                  }
                  height={256}
                  width={256}
                  alt="WalletIcon"
                  className="w-[24px] mt-2.5"
                ></Image>
                <h1
                  className={`font-[GrayfelDemi] ${
                    menuToggle === "stake" ? "text-[#06f2a8]" : "text-[#878787]"
                  } text-sm mt-2`}
                >
                  Stake
                </h1>
              </div>
              <div
                className="flex flex-col items-center justify-center h-[100%] w-[33%] hover:scale-110 transition-all duration-300 ease-linear"
                onClick={() => {
                  setMenuToggle("range");
                }}
              >
                <Image
                  src={
                    menuToggle === "range"
                      ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABXUlEQVR4nO3YsUoDQRDG8SnyTVBbQcHWRgux00fQZxBrG0E7WzsLtdTCRhG8Ga4QrASfREG0sBFUuJkktpEIwRC1E3Oz7A+2u2L/DLfsHVGNjLfLabhew/WOTbcpKjY9Ztduf8F0jyJi1/PBkLAx7OU8u7wlEYN2ucgur99iXA4oGuSYmkKeTOTJwGSdTV+GH4qy0D+a2eR91Jv5kxh26SQRgkrXYPocOiL+y677FAVyRE0gT6ImkMIkmlU5m8SHFZuchI/ogeth+IhPfjEJ08ve76BmJZuj3k72b9hkC673cL0Z65QzFBFMdodOlFNKIKLLpkrhI1wqtIoFih7RsGKJokCOqAnkSdQE0p2EhlhwfWST1dAR/HXdf0onpCdyDFwemlWxQn3ssvPzy67LFA3nmJriPJma4pQmg1+uLuwyR4nEnFFEGI4xOaKoGq4bcLmF69VEq5ga9X4GfQDsK3D75GWoSAAAAABJRU5ErkJggg=="
                      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABOklEQVR4nO3YoUpEQRiG4f8iBAWrRYPY9BL0GsRsEbRZDf/7zXI8Rg0WxWQSTIJXoiAaLIIKW7SurCguyzEJ7vzDvDDthHn4OLB7zDKqaZoZ4Aq4lbRjUZN0JGkwcpJFDDgbg8TEAAuSXovAuPsS8NKBaS1aXjGZ5nWZyMtI2gCeOx6KctInBHjP4DJ/x0h6KwWyLukpNCL6yw7sW5S8IjLJ6xKZ5CUsIWmuiD9Wko7DI4YBB+ERw9q2nQIuvj4HbU36PrV/C9iWdCfp2t1nLWLA3tiLeGIFIAbAuRWA6AOLFh0hadmiREVkEnWJTKLUJRTkAA/uvhYaoR/MYzmQYcEx95JW7buU0m6HtO/uKxatVDGZluoymZZKWoZffrr0er15KwRzahFjDAMcWtSATUk3wCUwPen7jPYBUctM73WKHo8AAAAASUVORK5CYII="
                  }
                  height={256}
                  width={256}
                  alt="WalletIcon"
                  className="w-[24px] mt-2.5 "
                ></Image>
                <h1
                  className={`font-[GrayfelDemi] ${
                    menuToggle === "range" ? "text-[#06f2a8]" : "text-[#878787]"
                  } text-sm mt-2`}
                >
                  Range Orders
                </h1>
              </div>
              <div
                className="flex flex-col items-center justify-center h-[100%] w-[33%] hover:scale-110 transition-all duration-300 ease-linear"
                onClick={() => {
                  window.location.href = "/wallet";
                }}
              >
                <Image
                  src={
                    menuToggle === "recieve"
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
                    menuToggle === "recieve"
                      ? "text-[#06f2a8]"
                      : "text-[#878787]"
                  } text-sm mt-2`}
                >
                  Wallet
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
        isLoading={isLoadingStake}
        title="Staking"
        desc="Staking your tokens"
        login={login}
        isLogin={false}
      />
      <LoadingProp
        isLoading={isLoadingUnstake}
        title="Unstaking"
        desc="Unstaking your tokens"
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
