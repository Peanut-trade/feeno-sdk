import { RequestParams, SubmissionResponse } from './types';
export interface IFeeNoRequest {
    send(sendRequest: RequestParams): Promise<SubmissionResponse>;
    cancel(): Promise<SubmissionResponse>;
    getStatus(): Promise<SubmissionResponse | string>;
}
