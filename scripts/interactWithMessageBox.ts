import { ethers } from "hardhat";

async function main() {
  


const messagebox = await ethers.getContractAt("IMessageBox","0x13F539A38bE5A4bDE3E6703f46E2eF58936320eE");
const message = await messagebox.message("Hello!");
const getallmessages = await messagebox.getTotalMessages();
 

 console.log(message);
 console.log(getallmessages);

//   const dutchAu = await ethers.getContractAt("I")




//   await dutch.deployed();
  

//   console.log(dutch.address);
//   console.log(_startingPrice,_discountRate,_nft,_nftId);
}

//transactionhash: 0x2aa98634566cc9bc1d7cd1bcff8bf0bb933e2f70aab7c536b3faf3f9cd5fd2c8 -- network rinkeby

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
