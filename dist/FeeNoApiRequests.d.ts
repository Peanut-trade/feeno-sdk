import { Estimate, EstimationResponse, SubmissionResponse, Submit, SupportedTokens } from './types';
export interface IFeeNoApiRequests {
    getTokens(): Promise<SupportedTokens>;
    createFeenoRequest(requestParams: Estimate): Promise<EstimationResponse>;
    send(txToSubmit: Submit): Promise<SubmissionResponse>;
    getStatus(bundleId: string): Promise<SubmissionResponse>;
    cancel(bundleId: string): Promise<SubmissionResponse>;
}
export declare class FeeNoApiRequests implements IFeeNoApiRequests {
    /**
     * Url that is passed to constructor for the future requests creation.
     * @type {apiUrl:string}
     */
    apiUrl: string;
    /**
     * FeeNoApiRequests instance is being created by the FeeNo class constructor.
     * Constructor need the apiUrl as the input param.
     */
    constructor(apiUrl: string);
    /**
     * Send request for a list of the supported tokens to pay fee to Api.
     * @returns {Promise<SupportedTokens>}
     */
    getTokens(): Promise<SupportedTokens>;
    /**
     * Send estimation request to Api.
     * @param {Estimate} requestParams
     * @returns {Promise<FeeNoRequest>}
     */
    createFeenoRequest(requestParams: Estimate): Promise<EstimationResponse>;
    /**
     * Send submit request to Api.
     * @param {Submit} txToSubmit
     * @returns {Promise<SubmissionResponse>}
     */
    send(txToSubmit: Submit): Promise<SubmissionResponse>;
    /**
     * Send getStatus request to Api.
     * @param {string} bundleId
     * @returns {Promise<SubmissionResponse>}
     */
    getStatus(bundleId: string): Promise<SubmissionResponse>;
    /**
     * Send cancel request to Api.
     * @param {string} bundleId
     * @returns {Promise<SubmissionResponse>}
     */
    cancel(bundleId: string): Promise<SubmissionResponse>;
}
