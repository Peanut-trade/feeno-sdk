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
    constructor(chainId: number);
    createFeenoRequest(params: Estimate, provider: Web3Provider): Promise<FeeNoRequest>;
    getTokens(): Promise<SupportedTokens>;
}
export {};
