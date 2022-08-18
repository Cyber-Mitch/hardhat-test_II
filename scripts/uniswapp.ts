import { ethers } from "hardhat";

async function main() {
    const WETHAddr = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const DAIAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const amountOut = 3000;
  const amountInMax = 1;

  const helpers = require("@nomicfoundation/hardhat-network-helpers");
  const WethHolder = "0x0716a17FBAeE714f1E6aB0f9d59edbC5f09815C0"
  await helpers.impersonateAccount(WethHolder);
  const impersonatedSigner = await ethers.getSigner(WethHolder);

  const WETH = await ethers.getContractAt(
    "IERC20",
    WETHAddr,
    impersonatedSigner
  );
  const DAI = await ethers.getContractAt("IERC20", DAIAddress);
  const ROUTER = await ethers.getContractAt(
    "IUniswap",
    UNIRouter,
    impersonatedSigner
  );
  await WETH.approve(UNIRouter, amountInMax);
  const WethBal = await WETH.balanceOf(WethHolder);
  const DaiBal = await DAI.balanceOf(WethHolder);

  const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

  console.log("balance before swap", WethBal, DaiBal);

  const result = await ROUTER.swapTokensForExactETH(
    amountOut,
    amountInMax,
    [DAIAddress,WETHAddr],
    WethHolder,
    deadline
  );
  console.log(await result.wait());

  const WethBalAfter = await WETH.balanceOf(WethHolder);
  const daiBalAfter = await DAI.balanceOf(WethHolder);

  console.log("balance after swap", WethBalAfter, daiBalAfter);


}

//usdt   149376720600308
//dai    500000764750

//after
//usdt  149376718595593
//dai   500002764750

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;


});
