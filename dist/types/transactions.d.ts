import { AddressLike, BNLike } from 'ethereumjs-util';
export declare enum TransactionType {
    TransferType = "transfer",
    SwapInputType = "exactInput",
    SwapOutputType = "exactOutput",
    SwapInputSingleType = "exactInputSingle",
    SwapETHInputSingleType = "ETHExactInputSingle",
    SwapOutputSingleType = "exactOutputSingle",
    MintPositionType = "mintPosition",
    ClaimFeeType = "claimFee",
    AddLiquidityType = "addLiquidity",
    RemoveLiquidityType = "removeLiquidity",
    CreatePositionType = "createPosition"
}
export declare type TransactionBody = TransactionForTransfer | TransactionForExactInput | TransactionForExactOutput | TransactionForExactInputSingle | TransactionForExactOutputSingle | TransactionForSwapExactTokensForTokens | TransactionForSwapTokensForExactTokens | TransactionForCreatePosition | TransactionForAddLiquidity;
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
    deadline: BNLike;
    sqrtPriceX96: BNLike;
}
export interface TransactionForAddLiquidity {
    tokenId: string;
    amount0Desired: BNLike;
    amount1Desired: BNLike;
    amount0Min: BNLike;
    amount1Min: BNLike;
    deadline: BNLike;
}
