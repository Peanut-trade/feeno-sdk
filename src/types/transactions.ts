import { AddressLike, BNLike } from 'ethereumjs-util';

export enum TransactionType {
  TransferType = 'transfer',
  SwapInputType = 'exactInput',
  SwapOutputType = 'exactOutput',
  SwapInputSingleType = 'exactInputSingle',
  SwapOutputSingleType = 'exactOutputSingle',
  ClaimFeeType = 'claimFee',
  CreatePositionType = 'createPosition',
  IncreaseLiquidityType = 'increaseLiquidity',
  DecreaseLiquidityType = 'decreaseLiquidity',
  CollectType = 'collect',
  SwapExactTokensForTokensType = 'swapExactTokensForTokens',
  SwapExactTokensForETHType = 'swapExactTokensForETH',
}

export type TransactionBody =
  | TransactionForTransfer
  | TransactionForExactInput
  | TransactionForExactOutput
  | TransactionForExactInputSingle
  | TransactionForExactOutputSingle
  | TransactionForSwapExactTokensForTokens
  | TransactionForSwapTokensForExactTokens
  | TransactionForCreatePosition
  | TransactionForIncreaseLiquidity
  | TransactionForDecreaseLiquidity
  | TransactionForCollect;

export interface TransactionForTransfer {
  addressTo: AddressLike;
  amount: BNLike;
  tokenContractAddress: AddressLike;
}

export interface TransactionForExactInput {
  path: string;
  recipient: AddressLike;
  deadline: number;
  amountIn: BNLike;
  amountOutMinimum: BNLike;
  value: BNLike;
}

export interface TransactionForDecreaseLiquidity {
  recipient: AddressLike;
  tokenId: number;
  deadline: number;
  amount0Min: BNLike;
  amount1Min: BNLike;
  liquidity: BNLike;
}

export interface TransactionForCollect {
  recipient: AddressLike;
  tokenId: number;
  amount0Max: BNLike;
  amount1Max: BNLike;
}

export interface TransactionForExactOutput {
  path: string;
  recipient: AddressLike;
  deadline: number;
  amountOut: BNLike;
  amountInMaximum: BNLike;
  value: BNLike;
}

export interface TransactionForExactInputSingle {
  tokenIn: AddressLike;
  tokenOut: AddressLike;
  fee: BNLike;
  recipient: AddressLike;
  deadline: number;
  amountIn: BNLike;
  amountOutMinimum: BNLike;
  sqrtPriceLimitX96: BNLike;
}

export interface TransactionForExactOutputSingle {
  tokenIn: AddressLike;
  tokenOut: AddressLike;
  fee: BNLike;
  recipient: AddressLike;
  deadline: number;
  amountOut: BNLike;
  amountInMaximum: BNLike;
  sqrtPriceLimitX96: BNLike;
  value: BNLike;
}

export interface TransactionForSwapExactTokensForTokens {
  amountIn: BNLike;
  amountOutMin: BNLike;
  path: AddressLike[];
  to: AddressLike;
  deadline: number;
}

export interface TransactionForSwapTokensForExactTokens {
  amountOut: BNLike;
  amountInMax: BNLike;
  path: AddressLike[];
  to: AddressLike;
  deadline: number;
}

export interface TransactionForCreatePosition {
  token0: AddressLike;
  token1: AddressLike;
  fee: BNLike;
  tickLower: BNLike;
  tickUpper: BNLike;
  amount0Desired: BNLike;
  amount1Desired: BNLike;
  amount0Min: BNLike;
  amount1Min: BNLike;
  recipient: AddressLike;
  deadline: number;
  sqrtPriceX96: BNLike;
  value: BNLike;
}

export interface TransactionForIncreaseLiquidity {
  tokenId: number;
  amount0Desired: BNLike;
  amount1Desired: BNLike;
  amount0Min: BNLike;
  amount1Min: BNLike;
  deadline: number;
  value: BNLike;
}
