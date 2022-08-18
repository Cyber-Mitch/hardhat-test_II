import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

async function main() {
    const WETHaddr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; //0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    const DAIaddr = "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"; //0xB8c77482e45F1F44dE1745F52C74426C631bDD52

    const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

    const amountADesired = 1
    const amountBDesired = 200

    const amountAMin = 1
    const amountBMin = 198


    const EthHolder = "0x0716a17FBAeE714f1E6aB0f9d59edbC5f09815C0";

    await helpers.impersonateAccount(EthHolder);
    const impersonatedSigner = await ethers.getSigner(EthHolder);

    const ETHER = await ethers.getContractAt(
      "IERC20",
      WETHaddr,
      impersonatedSigner
    );

    const DAI = await ethers.getContractAt("IERC20", DAIaddr, impersonatedSigner);

    
    const ROUTER = await ethers.getContractAt(
      "IUniswap",
      UNIRouter,
      impersonatedSigner
    );

    const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

    await ETHER.approve(UNIRouter, amountBDesired);
    await DAI.approve(UNIRouter, amountADesired)
    const result = await ROUTER.addLiquidity(
      WETHaddr,
      DAIaddr,
      amountADesired,
      amountBDesired,
      amountAMin,
      amountBMin,
      EthHolder,
      deadline,
      {gasLimit: ethers.utils.hexlify(1000000)}
    );

    console.log(await result.wait());
    const EthBalAfter = await ETHER.balanceOf(EthHolder);
    console.log("balance of ether after adding liquidty ", EthBalAfter);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
