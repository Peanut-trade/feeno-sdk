import { AddressLike, BNLike } from 'ethereumjs-util';

export enum TransactionType {
  TransferType = 'transfer',
  SwapInputType = 'exactInput',
  SwapOutputType = 'exactOutput',
  SwapInputSingleType = 'exactInputSingle',
  SwapETHInputSingleType = 'ETHExactInputSingle',
  SwapOutputSingleType = 'exactOutputSingle',
  MintPositionType = 'mintPosition',
  ClaimFeeType = 'claimFee',
  AddLiquidityType = 'addLiquidity',
  DecreaseLiquidityType = 'decreaseLiquidity',
  CollectType = 'collect',
}

export type TransactionBody =
  | TransactionForTransfer
  | TransactionForExactInput
  | TransactionForExactOutput
  | TransactionForExactInputSingle
  | TransactionForExactOutputSingle
  | TransactionForSwapExactTokensForTokens
  | TransactionForSwapTokensForExactTokens
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
