import {
  BundleId,
  CancellationResponse,
  Estimate,
  EstimationResponse,
  SubmissionResponse,
  Submit,
} from './types';
import { TransactionResult } from './types/TransactionResult';

export interface IFeeNo {
  estimate(params: Estimate): Promise<EstimationResponse>;
  submit(params: Submit): Promise<SubmissionResponse>;
  cancel(bundleId: BundleId): Promise<CancellationResponse>;
  getTransaction(bundleId: BundleId): Promise<TransactionResult>;
}

export class FeeNo implements IFeeNo {
  // TODO: Need to add provider as argument for constructor and save for sign
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}
}
