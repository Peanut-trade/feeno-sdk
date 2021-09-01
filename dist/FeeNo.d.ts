import { Web3Provider } from '@ethersproject/providers';
import { BundleId, CancellationResponse, Estimate, EstimationResponse, SubmissionResponse, Submit, TransactionResult, Sign } from './types';
export interface IFeeNo {
    estimate(params: Estimate): Promise<EstimationResponse>;
    submit(params: Submit): Promise<SubmissionResponse>;
    cancel(bundleId: BundleId): Promise<CancellationResponse>;
    getTransaction(bundleId: BundleId): Promise<TransactionResult>;
    sign(params: Sign): Promise<string>;
}
export declare class FeeNo implements IFeeNo {
    private apiUrl;
    provider: Web3Provider;
    constructor(provider: Web3Provider);
    cancel(bundleId: BundleId): Promise<CancellationResponse>;
    estimate(params: Estimate): Promise<EstimationResponse>;
    getTransaction(bundleId: BundleId): Promise<TransactionResult>;
    submit(params: Submit): Promise<SubmissionResponse>;
    sign(params: Sign): Promise<string>;
}
