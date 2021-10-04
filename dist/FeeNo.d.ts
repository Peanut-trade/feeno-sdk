import { Web3Provider } from '@ethersproject/providers';
import { FeeNoRequest } from './FeeNoRequest';
import { Estimate } from './types';
export declare class FeeNo {
    static createFeenoRequest(params: Estimate, provider: Web3Provider): Promise<FeeNoRequest>;
}
