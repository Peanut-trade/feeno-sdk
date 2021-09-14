import { AddressLike, BNLike } from 'ethereumjs-util';
import { TransactionBody, TransactionType } from './transactions';
import { EstimateStatus, EstimationId, FeePayerType } from './share';
/**
 *
 * @export
 * @interface Estimate
 */
export interface Estimate {
    /**
     * Transaction type
     * @type {TransactionType}
     * @memberof Estimate
     */
    transactionType: TransactionType;
    /**
     * Transaction body
     * @type {TransactionBody}
     * @memberof Estimate
     */
    transactionBody: TransactionBody;
    /**
     * User address
     * @type {AddressLike}
     * @memberof Estimate
     */
    addressFrom: AddressLike;
    /**
     * Token to spend in order to cover network fee
     * @type {AddressLike}
     * @memberof Estimate
     */
    erc20TokenToPayFee: AddressLike;
    /**
     * Fee payer: receiver or sender
     * @type {FeePayerType}
     * @memberof Estimate
     */
    feePayer: FeePayerType;
}
export interface approveRequired {
    tokenAddress: AddressLike;
    spender: AddressLike;
    amount: BNLike;
}
/**
 *
 * @export
 * @interface EstimationResponse
 */
export interface EstimationResponse {
    /**
     *
     * @type {boolean}
     * @memberof EstimationResponse
     */
    status?: boolean;
    /**
     *
     * @type {string}
     * @memberof EstimationResponse
     */
    id: EstimationId;
    /**
     *
     * @type {approveRequired}
     * @memberof EstimationResponse
     */
    approveRequired: approveRequired[];
    /**
     *
     * @type {MarketGasPriceGwei}
     * @memberof EstimationResponse
     */
    marketGasPriceGwei: MarketGasPriceGwei;
    /**
     *
     * @type {FeePayerType}
     * @memberof EstimationResponse
     */
    feePayer?: FeePayerType;
    /**
     *
     * @type {ExecutionSwap}
     * @memberof EstimationResponse
     */
    executionSwap: ExecutionSwap;
}
export interface MarketGasPriceGwei {
    baseFee: number;
    maxPriorityFeePerGas: {
        fast: number;
        medium: number;
        slow: number;
    };
}
export declare type ExecutionSwap = {
    [key in 'dexSwap' | 'cexSwap']: {
        ethTokenPrice: number;
        totalGasUsage: number;
        simulations: {
            ethTransfer: {
                status: EstimateStatus;
                gasUsage: number;
            };
            approve: {
                id: EstimationId;
                status: EstimateStatus;
                gasUsage: number;
            }[];
            execute: {
                id: EstimationId;
                status: EstimateStatus;
                gasUsage: number;
            };
        };
        miningSpeed: {
            fast: MiningSpeed;
            medium: MiningSpeed;
            slow: MiningSpeed;
        };
    };
};
export interface MiningSpeed {
    ethGasFee: number;
    tokenBasedGasFee: number;
    data: {
        transactions: [AddressLike, BNLike, string][];
        messageForSing: string;
    };
}
