// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

interface IUniswap{

    function addLiquidity(
  address tokenA,
  address tokenB,
  uint amountADesired,
  uint amountBDesired,
  uint amountAMin,
  uint amountBMin,
  address to,
  uint deadline
) external returns (uint amountA, uint amountB, uint liquidity);

}