import React from 'react';

import { ethers } from "ethers";

declare global {
    interface Window{
      ethereum?:any
    }
}


interface Props {
  getAddressUser: (address:string) => void;
}

export const ButtonConnectWallet: React.FC<Props> = (props) => {
  const connectToMetaMask = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        console.log(`Connected to MetaMask with address ${await signer.getAddress()}`);
        props.getAddressUser(signer.address);
      } else {
        console.error('Please install MetaMask to use this feature');
      }
    } catch (err) {
      console.error('Error connecting to MetaMask:', err);
    }
  };

  return (
    <button onClick={connectToMetaMask}>
      Connect
    </button>
  );
};

// export default ButtonConnectWallet;