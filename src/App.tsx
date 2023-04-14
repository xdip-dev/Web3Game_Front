import React, { useState } from 'react';
import './App.css';
import { ButtonConnectWallet } from './components/ButtonConnectWallet';
// import contractABITreasury from './abi/treasury.json'
import XenosToken from './abi/XenosToken.json'
import { ethers } from 'ethers';



function App() {

  const tokenAddress = '0x5c08215338db9f5a36878e799dab1fDA2EcA89b7'
  // const treasuryAddress = '0x2ce1F61cd4a411442E574f7B8606eb2A4dB29032'

  const [addressUser,setAddressUser]=useState<string>('')
  const [userBalanceXDP,setUserBalance]=useState<string>('')

  async function getAddressUser(address:string){
    setAddressUser(address)

    setUserBalance(await getBalanceOf(addressUser))
    
  }

async function ConnectionToken() {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const xenosContract = new ethers.Contract(tokenAddress, XenosToken.abi, signer)
  return xenosContract
}

async function getBalanceOf(address:string) {
  const xenosContract = await ConnectionToken()
  const balance:ethers.BigNumberish = await xenosContract.balanceOf(address)
  return ethers.formatEther(balance)
}


  return (
    <div className="App">
      <ButtonConnectWallet getAddressUser={getAddressUser}/>
      {addressUser} & {userBalanceXDP} XDP

    </div>
  );
}

export default App;
