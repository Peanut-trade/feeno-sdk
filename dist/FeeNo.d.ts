import { Web3Provider } from '@ethersproject/providers';
import { AddressLike } from 'ethereumjs-util';
import { FeeNoRequest } from './FeeNoRequest';
import { FeeNoApiRequests } from './FeeNoApiRequests';
import { Estimate, SupportedTokens, SupportedChains } from './types';
interface IFeeNo {
    createFeenoRequest(params: Estimate, provider: Web3Provider): Promise<FeeNoRequest>;
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
     * import { FeeNo, FeeNoApiRequests }  from 'feeno-sdk';
     *
     * const feeNo = new RemmeRest(5);
     * ```
     */
    constructor(chainId?: number);
    /**
     * Make and send estimate request with given estimation data and user's provider.
     * @example
     * ```typescript
     * import { FeeNo, FeeNoApiRequests }  from 'feeno-sdk';
     *
     * const feeNo = new RemmeRest();
     * const FeeNoRequest = feeNo.createFeenoRequest(estimateParams, provider);
     * ```
     * @param {Estimate} params
     * @param {Web3Provider} provider
     * @returns {Promise<FeeNoRequest>}
     */
    createFeenoRequest(params: Estimate, provider: Web3Provider): Promise<FeeNoRequest>;
    /**
     * Returns the object of supported tokens to pay fee.
     * @example
     * ```typescript
     * import { FeeNo, FeeNoApiRequests }  from 'feeno-sdk';
     *
     * const feeNo = new RemmeRest();
     * const supportedTokens = feeNo.getTokens();
     * ```
     * @returns {Promise<SupportedTokens>}
     */
    getTokens(): Promise<SupportedTokens>;
}
export {};
