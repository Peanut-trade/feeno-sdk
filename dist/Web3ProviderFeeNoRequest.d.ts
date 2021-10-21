import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import Common from '@ethereumjs/common';
import { FeeNoApiRequests } from './FeeNoApiRequests';
import { EstimationResponse, ExType, RequestParams, SubmissionResponse, SupportedChains } from './types';
import { IFeeNoRequest } from './FeeNoRequest';
export declare class Web3ProviderFeeNoRequest implements IFeeNoRequest {
    estimationResponse: EstimationResponse;
    provider: Web3Provider;
    signer: JsonRpcSigner;
    chainId: SupportedChains;
    FeeNoApi: FeeNoApiRequests;
    common: Common;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    bundleId: string;
    /**
     * FeeNoRequests instance is being created in the FeeNo class by it's createFeenoRequest() method.
     * @example
     * Implementation with all params.
     * ```typescript
     * import { FeeNo, FeeNoApiRequests }  from '@peanut.trade/feeno-sdk';
     *
     * const feeNo = new FeeNo();
     * const feeNoRequest = feeNo.createFeenoRequest(estimateData, provider);
     * ```
     */
    constructor(estimationResponse: EstimationResponse, provider: Web3Provider, chainId: SupportedChains, FeeNoApi: FeeNoApiRequests);
    private _getSignature;
    getSwapType(sendRequest: RequestParams): ExType;
    private _approveTokensUse;
    private _approveETHTransfer;
    private _signTransfer;
    private _getExecuteAllowance;
    /**
     * Send submit transaction.
     * @example
     * ```typescript
     * import { FeeNo, FeeNoApiRequests }  from '@peanut.trade/feeno-sdk';
     *
     * const feeNo = new FeeNo( 1 );
     * const feeNoRequest = feeNo.createFeenoRequest(estimateData, provider);
     * // If submit is successful you will get SubmissionResponse typed response.
     * const submitResponce = FeeNoRequestInstance.send(sendRequest);
     * ```
     * @param {RequestParams} sendRequest
     * @returns {Promise<SubmissionResponse>}
     */
    send(sendRequest: RequestParams): Promise<SubmissionResponse>;
    /**
     * Cancel submit request if it's not mined yet.
     * @example
     * ```typescript
     * import { FeeNo, FeeNoApiRequests }  from '@peanut.trade/feeno-sdk';
     *
     * const feeNo = new FeeNo( 1 );
     * const feeNoRequest = feeNo.createFeenoRequest(estimateData, provider);
     * // errorMessage: "Transaction not found"
     * const cancelRequest1 = feeNoRequest.cancel();
     *
     * const submitResponce = feeNoRequest.send(sendRequest);
     * // Transaction will be canceled. You will get SubmissionResponse type response.
     * const cancelRequest2 = feeNoRequest.cancel();
     *
     * // Transaction is canceled already. You will get the same response as from cancelRequest2.
     * const cancelRequest3 = feeNoRequest.cancel();
     * ```
     * @returns {Promise<SubmissionResponse>}
     */
    cancel(): Promise<SubmissionResponse>;
    /**
     * Get the transaction status.
     * @example
     * ```typescript
     * import { FeeNo, FeeNoApiRequests }  from '@peanut.trade/feeno-sdk';
     *
     * const feeNo = new FeeNo( 1 );
     * const feeNoRequest= feeNo.createFeenoRequest(estimateData, provider);
     * // errorMessage: "Please, send transaction first"
     * const cancelRequest1 = feeNoRequest.status();
     *
     * const submitResponce = feeNoRequest.send(sendRequest);
     * // You will get SubmissionResponse type response
     * const cancelRequest2 = feeNoRequest.status();
     * ```
     * @returns {Promise<SubmissionResponse>}
     */
    getStatus(): Promise<SubmissionResponse>;
}
