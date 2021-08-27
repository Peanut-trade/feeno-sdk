import { AddressLike, BNLike } from 'ethereumjs-util';
export declare enum TransactionType {
    TransferType = "transfer",
    SwapInputType = "swapInput",
    SwapOutputType = "swapOutput",
    MintPositionType = "mintPosition",
    ClaimFeeType = "claimFee",
    AddLiquidityType = "addLiquidity",
    RemoveLiquidityType = "removeLiquidity"
}
export interface TransactionDetails {
    [key: string]: AddressLike | BNLike | string | number;
}
export declare type TransactionBody = TransactionForTransfer | TransactionForExactInputSingle | TransactionForExactOutputSingle;
export interface TransactionForTransfer {
    addressTo: AddressLike;
    amount: BNLike;
    tokenContractAddress: AddressLike;
}
export interface TransactionForExactInputSingle {
    tokenIn: AddressLike;
    tokenOut: AddressLike;
    fee: BNLike;
    recipient: AddressLike;
    deadline: BNLike;
    amountIn: BNLike;
    amountOutMinimum: BNLike;
    sqrtPriceLimitX96: BNLike;
}
export interface TransactionForExactOutputSingle {
    tokenIn: AddressLike;
    tokenOut: AddressLike;
    fee: BNLike;
    recipient: AddressLike;
    deadline: BNLike;
    amountOut: BNLike;
    amountInMaximum: BNLike;
    sqrtPriceLimitX96: BNLike;
}
