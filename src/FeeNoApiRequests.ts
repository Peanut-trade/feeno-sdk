import axios from 'axios';
import { Estimate, EstimationResponse, SubmissionResponse, Submit, SupportedTokens } from './types';

export interface IFeeNoApiRequests {
  getTokens(): Promise<SupportedTokens>;
  createFeenoRequest(requestParams: Estimate): Promise<EstimationResponse>;
  send(txToSubmit: Submit): Promise<SubmissionResponse>;
  getStatus(bundleId: string): Promise<SubmissionResponse>;
  cancel(bundleId: string): Promise<SubmissionResponse>;
}
export class FeeNoApiRequests implements IFeeNoApiRequests {
  /**
   * Url that is passed to constructor for the future requests creation.
   * @type {apiUrl:string}
   */
  apiUrl: string;

  /**
   * FeeNoApiRequests instance is being created by the FeeNo class constructor.
   * Constructor need the apiUrl as the input param.
   */
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  /**
   * Send request for a list of the supported tokens to pay fee to Api.
   * @returns {Promise<SupportedTokens>}
   */
  async getTokens(): Promise<SupportedTokens> {
    const url = `${this.apiUrl}/tokens`;
    const response = await axios.get(url);
    return response.data.tokens;
  }

  /**
   * Send estimation request to Api.
   * @param {Estimate} requestParams
   * @returns {Promise<FeeNoRequest>}
   */
  async createFeenoRequest(requestParams: Estimate): Promise<EstimationResponse> {
    const url = `${this.apiUrl}/estimate`;
    const response = await axios.post(url, requestParams);
    return response.data;
  }

  /**
   * Send submit request to Api.
   * @param {Submit} txToSubmit
   * @returns {Promise<SubmissionResponse>}
   */
  async send(txToSubmit: Submit): Promise<SubmissionResponse> {
    const url = `${this.apiUrl}/submit`;
    const response = await axios.post(url, txToSubmit);
    return response.data;
  }

  /**
   * Send getStatus request to Api.
   * @param {string} bundleId
   * @returns {Promise<SubmissionResponse>}
   */
  async getStatus(bundleId: string): Promise<SubmissionResponse> {
    const url = `${this.apiUrl}/bundle/${bundleId}`;
    const response = await axios.get(url);
    return response.data;
  }

  /**
   * Send cancel request to Api.
   * @param {string} bundleId
   * @returns {Promise<SubmissionResponse>}
   */
  async cancel(bundleId: string): Promise<SubmissionResponse> {
    const url = `${this.apiUrl}/bundle/${bundleId}/cancel`;
    const response = await axios.delete(url);
    return response.data;
  }
}
