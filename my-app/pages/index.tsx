import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { GaslessOnboarding, GaslessWalletConfig, LoginConfig} from '@gelatonetwork/gasless-onboarding';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  useEffect(()=>{
    login()
  },[])

  const login = async() => {
    try {
      const gaslessWalletConfig = { apiKey: process.env.ONEBALANCE_API_KEY };
      const loginConfig = {
        domains: ["http://localhost:3000"],
        chain: {
          id: 80001,
          rpcUrl: process.env.ALCHEMY_RPC_URL,
        },
        openLogin: {
          redirectUrl: "http://localhost:3000",
        },
      };
      
      const gaslessOnboarding = new GaslessOnboarding(
        loginConfig as LoginConfig,
        gaslessWalletConfig as GaslessWalletConfig
      );
      await gaslessOnboarding.init();

      const web3AuthProvider = await gaslessOnboarding.login();
      console.log(web3AuthProvider);

      const gaslessWallet = gaslessOnboarding.getGaslessWallet();
      console.log(gaslessWallet);

      const address = gaslessWallet.getAddress();
      console.log(address);

      const userInfo = await gaslessOnboarding.getUserInfo();
      console.log(userInfo);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <button onClick={login}> Login </button>
      </div>
    </>
  )
}
