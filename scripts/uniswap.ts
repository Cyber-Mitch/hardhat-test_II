import { ethers } from "hardhat";

async function main() {
     // const address tokenA = ""
  // const address tokenB = ""

  const helpers = require("@nomicfoundation/hardhat-network-helpers");
    const EthHolder = "0x0716a17FBAeE714f1E6aB0f9d59edbC5f09815C0";
    await helpers.impersonateAccount(EthHolder);
    const impersonatedSigner = await ethers.getSigner(EthHolder);

    const USDT = await ethers.getContractAt(
      "IERC20",
      tokenA,
      impersonatedSigner
    );
}