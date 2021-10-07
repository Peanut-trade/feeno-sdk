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
   * Url that is passed to constructor for the future requests creation;
   * @type {apiUrl:string}
   */
  apiUrl: string;

  /**
   * FeeNoApiRequests instance is being created by the FeeNo class constructor;
   * After instance creation it can be used for the interaction with Feeno Api;
   * Constructor need the apiUrl as the input param;
   */
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async getTokens(): Promise<SupportedTokens> {
    const url = `${this.apiUrl}/tokens`;
    const response = await axios.get(url);
    return response.data.tokens;
  }
  /**
   * Returns a list of the supported tokens;
   * @returns {Promise<SupportedTokens>}
   */

  async createFeenoRequest(requestParams: Estimate): Promise<EstimationResponse> {
    const url = `${this.apiUrl}/estimate`;
    const response = await axios.post(url, requestParams);
    return response.data;
  }
  /**
   * Returns the Feeno Api responce for the estimation request with given data;
   * @param {Estimate} requestParams
   * @returns {Promise<FeeNoRequest>}
   */

  async send(txToSubmit: Submit): Promise<SubmissionResponse> {
    const url = `${this.apiUrl}/submit`;
    const response = await axios.post(url, txToSubmit);
    return response.data;
  }
  /**
   * Returns the Feeno Api responce for the submit request with given data;
   * @param {Submit} txToSubmit
   * @returns {Promise<SubmissionResponse>}
   */

  async getStatus(bundleId: string): Promise<SubmissionResponse> {
    const url = `${this.apiUrl}/bundle/${bundleId}`;
    const response = await axios.get(url);
    return response.data;
  }
  /**
   * Returns the Feeno Api responce for the getStatus request with bundleId in the url;
   * @param {string} bundleId
   * @returns {Promise<SubmissionResponse>}
   */

  async cancel(bundleId: string): Promise<SubmissionResponse> {
    const url = `${this.apiUrl}/bundle/${bundleId}/cancel`;
    const response = await axios.delete(url);
    return response.data;
  }
  /**
   * Returns the Feeno Api responce for the getStatus request with bundleId in the url;
   * @param {string} bundleId
   * @returns {Promise<SubmissionResponse>}
   */
}
