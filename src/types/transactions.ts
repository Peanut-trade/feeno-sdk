import { AddressLike, BNLike } from 'ethereumjs-util';

export enum TransactionType {
  TransferType = 'transfer',
  SwapInputType = 'exactInput',
  SwapOutputType = 'exactOutput',
  SwapInputSingleType = 'exactInputSingle',
  SwapETHInputSingleType = 'ETHExactInputSingle',
  SwapInputETHSingleType = 'ExactInputETHSingle',
  SwapOutputSingleType = 'exactOutputSingle',
  MintPositionType = 'mintPosition',
  ClaimFeeType = 'claimFee',
  AddLiquidityType = 'addLiquidity',
  RemoveLiquidityType = 'removeLiquidity',
}

export type TransactionBody =
  | TransactionForTransfer
  | TransactionForExactInput
  | TransactionForExactOutput
  | TransactionForExactInputSingle
  | TransactionForExactOutputSingle
  | TransactionForSwapExactTokensForTokens
  | TransactionForSwapTokensForExactTokens;

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
