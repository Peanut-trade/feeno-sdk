import { BundleId, CancellationResponse, Estimate, EstimationResponse, SubmissionResponse, Submit, TransactionResult } from './types';
export interface IFeeNo {
    estimate(params: Estimate): Promise<EstimationResponse>;
    submit(params: Submit): Promise<SubmissionResponse>;
    cancel(bundleId: BundleId): Promise<CancellationResponse>;
    getTransaction(bundleId: BundleId): Promise<TransactionResult>;
}
export declare class FeeNo implements IFeeNo {
    private apiUrl;
    constructor();
    cancel(bundleId: BundleId): Promise<CancellationResponse>;
    estimate(params: Estimate): Promise<EstimationResponse>;
    getTransaction(bundleId: BundleId): Promise<TransactionResult>;
    submit(params: Submit): Promise<SubmissionResponse>;
}
