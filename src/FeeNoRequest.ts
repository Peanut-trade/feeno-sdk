import { RequestParams, SubmissionResponse } from './types';
import { ExType } from './types/Submit';
import { EstimationResponse } from './types/Estimate';

export interface IFeeNoRequest {
  send(sendRequest: RequestParams): Promise<SubmissionResponse>;
  cancel(): Promise<SubmissionResponse>;
  getStatus(): Promise<SubmissionResponse>;
  getSwapType(sendRequest: RequestParams): ExType;
  estimationResponse: EstimationResponse;
}
