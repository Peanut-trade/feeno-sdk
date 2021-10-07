import { Estimate, EstimationResponse, SubmissionResponse, Submit, SupportedTokens } from './types';
export interface IFeeNoApiRequests {
    getTokens(): Promise<SupportedTokens>;
    createFeenoRequest(requestParams: Estimate): Promise<EstimationResponse>;
    submit(txToSubmit: Submit): Promise<SubmissionResponse>;
    getStatus(bundleId: string): Promise<SubmissionResponse>;
    cancel(bundleId: string): Promise<SubmissionResponse>;
}
export declare class FeeNoApiRequests implements IFeeNoApiRequests {
    apiUrl: string;
    constructor(apiUrl: string);
    getTokens(): Promise<SupportedTokens>;
    createFeenoRequest(requestParams: Estimate): Promise<EstimationResponse>;
    submit(txToSubmit: Submit): Promise<SubmissionResponse>;
    getStatus(bundleId: string): Promise<SubmissionResponse>;
    cancel(bundleId: string): Promise<SubmissionResponse>;
}
