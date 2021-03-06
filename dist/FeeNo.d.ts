import { Web3Provider } from '@ethersproject/providers';
import { AddressLike } from 'ethereumjs-util';
import { Wallet } from 'ethers';
import { IFeeNoRequest } from '.';
import { FeeNoApiRequests } from './FeeNoApiRequests';
import { Estimate, SupportedTokens, SupportedChains } from './types';
interface IFeeNo {
    createFeenoRequest(params: Estimate, provider: Web3Provider): Promise<IFeeNoRequest>;
    getTokens(): Promise<SupportedTokens>;
}
export declare class FeeNo implements IFeeNo {
    chainId: SupportedChains;
    apiURL: string;
    FeeNoContract: AddressLike;
    FeeNoApi: FeeNoApiRequests;
    /**
     * Constructor need the chainId as the input params(for example, Goerli testnet chainId is 5).
     ** Default chainId is 1(MainNet).
     * @example
     * Implementation with all params.
     * ```typescript
     * import { FeeNo, FeeNoApiRequests }  from '@peanut.trade/feeno-sdk';
     *
     * const feeNo = new FeeNo(5);
     * ```
     */
    constructor(chainId?: number);
    /**
     * Make and send estimate request with given estimation data and user's provider.
     * @example
     * ```typescript
     * import { FeeNo, FeeNoApiRequests }  from '@peanut.trade/feeno-sdk';
     *
     * const feeNo = new FeeNo();
     * const FeeNoRequest = feeNo.createFeenoRequest(estimateParams, provider);
     * ```
     * @param {Estimate} params
     * @param {Web3Provider} provider
     * @returns {Promise<IFeeNoRequest>}
     */
    createFeenoRequest(params: Estimate, provider: Web3Provider | Wallet): Promise<IFeeNoRequest>;
    /**
     * Returns the object of supported tokens to pay fee.
     * @example
     * ```typescript
     * import { FeeNo, FeeNoApiRequests }  from '@peanut.trade/feeno-sdk';
     *
     * const feeNo = new FeeNo();
     * const supportedTokens = feeNo.getTokens();
     * ```
     * @returns {Promise<SupportedTokens>}
     */
    getTokens(): Promise<SupportedTokens>;
}
export {};
