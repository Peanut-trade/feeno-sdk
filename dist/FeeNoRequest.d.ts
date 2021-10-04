import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers';
import Common from '@ethereumjs/common';
import { EstimationResponse, RequestParams, SubmissionResponse } from './types/index';
export interface IFeeNoRequest {
    send(sendRequest: RequestParams): Promise<SubmissionResponse>;
    cancel(): Promise<string>;
    getStatus(): Promise<SubmissionResponse | string>;
}
export declare class FeeNoRequest implements IFeeNoRequest {
    estimationResponse: EstimationResponse;
    provider: Web3Provider;
    signer: JsonRpcSigner;
    chainId: number;
    common: Common;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    bundleId: string;
    constructor(estimationResponse: EstimationResponse, provider: Web3Provider);
    private _getSwapType;
    private _approveTokensUse;
    private _approveETHTransfer;
    private _approveTransaction;
    send(sendRequest: RequestParams): Promise<SubmissionResponse>;
    cancel(): Promise<string>;
    getStatus(): Promise<SubmissionResponse>;
}
