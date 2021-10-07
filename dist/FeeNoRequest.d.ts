import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers';
import Common from '@ethereumjs/common';
import { EstimationResponse, RequestParams, SubmissionResponse, SupportedChains } from './types/index';
import { FeeNoApiRequests } from './FeeNoApiRequests';
export interface IFeeNoRequest {
    send(sendRequest: RequestParams): Promise<SubmissionResponse>;
    cancel(): Promise<SubmissionResponse>;
    getStatus(): Promise<SubmissionResponse | string>;
}
export declare class FeeNoRequest implements IFeeNoRequest {
    estimationResponse: EstimationResponse;
    provider: Web3Provider;
    signer: JsonRpcSigner;
    chainId: SupportedChains;
    FeeNoApi: FeeNoApiRequests;
    common: Common;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    bundleId: string;
    constructor(estimationResponse: EstimationResponse, provider: Web3Provider, chainId: SupportedChains, FeeNoApi: FeeNoApiRequests);
    private _getSignature;
    private _getSwapType;
    private _approveTokensUse;
    private _approveETHTransfer;
    private _signTransfer;
    private _getExecuteAllowance;
    send(sendRequest: RequestParams): Promise<SubmissionResponse>;
    cancel(): Promise<SubmissionResponse>;
    getStatus(): Promise<SubmissionResponse>;
}
