import axios from 'axios';
import { Estimate, EstimationResponse, SubmissionResponse, Submit, SupportedTokens } from './types';

export interface IFeeNoApiRequests {
  getTokens(): Promise<SupportedTokens>;
  createFeenoRequest(requestParams: Estimate): Promise<EstimationResponse>;
  submit(txToSubmit: Submit): Promise<SubmissionResponse>;
  getStatus(bundleId: string): Promise<SubmissionResponse>;
  cancel(bundleId: string): Promise<SubmissionResponse>;
}
export class FeeNoApiRequests implements IFeeNoApiRequests {
  apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async getTokens(): Promise<SupportedTokens> {
    const url = `${this.apiUrl}/tokens`;
    const response = await axios.get(url);
    return response.data.tokens;
  }

  async createFeenoRequest(requestParams: Estimate): Promise<EstimationResponse> {
    const url = `${this.apiUrl}/estimate`;
    const response = await axios.post(url, requestParams);
    return response.data;
  }

  async submit(txToSubmit: Submit): Promise<SubmissionResponse> {
    const url = `${this.apiUrl}/submit`;
    const response = await axios.post(url, txToSubmit);
    return response.data;
  }

  async getStatus(bundleId: string): Promise<SubmissionResponse> {
    const url = `${this.apiUrl}/bundle/${bundleId}`;
    const response = await axios.get(url);
    return response.data;
  }

  async cancel(bundleId: string): Promise<SubmissionResponse> {
    const url = `${this.apiUrl}/bundle/${bundleId}/cancel`;
    const response = await axios.delete(url);
    return response.data;
  }
}
