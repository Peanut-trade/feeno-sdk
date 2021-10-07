import { Web3Provider } from '@ethersproject/providers';
import { AddressLike } from 'ethereumjs-util';
import config from '../config/default.json';
import { FeeNoRequest } from './FeeNoRequest';
import { FeeNoApiRequests } from './FeeNoApiRequests';
import { Estimate, SupportedTokens, SupportedChains } from './types';

interface IFeeNo {
  createFeenoRequest(params: Estimate, provider: Web3Provider): Promise<FeeNoRequest>;
  getTokens(): Promise<SupportedTokens>;
}

export class FeeNo implements IFeeNo {
  chainId: SupportedChains;

  apiURL: string;

  FeeNoContract: AddressLike;

  FeeNoApi: FeeNoApiRequests;

  /**
   * Constructor need the chainId as the input params
   * @example
   * Implementation with all params.
   * ```typescript
   * import { FeeNo, FeeNoApiRequests }  from 'feeno-sdk';
   *
   * const FeeNo = new RemmeRest( 5 );
   * ```
   */
  constructor(chainId: number) {
    if (!Object.values(SupportedChains).includes(chainId)) throw new Error('Unsupported network');
    this.chainId = chainId;
    this.apiURL = config[this.chainId].apiURL;
    this.FeeNoApi = new FeeNoApiRequests(this.apiURL);
  }

  async createFeenoRequest(params: Estimate, provider: Web3Provider): Promise<FeeNoRequest> {
    const response = await this.FeeNoApi.createFeenoRequest(params);
    return new FeeNoRequest(response, provider, this.chainId, this.FeeNoApi);
  }
  /**
   * Make and send estimate request with given estimation data and user's provider.
   * Create feeno url using the given network chainId
   * @param {Estimate} params
   * @param {Web3Provider} provider
   * @returns {Promise<FeeNoRequest>}
   */

  async getTokens(): Promise<SupportedTokens> {
    const response = await this.FeeNoApi.getTokens();
    return response;
  }
  /**
   * Returns a list of supported tokens to pay fee
   * @returns {Promise<SupportedTokens>}
   */
}
