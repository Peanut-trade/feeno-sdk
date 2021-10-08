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
   * Constructor need the chainId as the input params(for example, Goerli testnet chainId is 5).
   ** Default chainId is 1(MainNet).
   * @example
   * Implementation with all params.
   * ```typescript
   * import { FeeNo, FeeNoApiRequests }  from 'feeno-sdk';
   *
   * const feeNo = new RemmeRest(5);
   * ```
   */
  constructor(chainId = 1) {
    if (!Object.values(SupportedChains).includes(chainId)) throw new Error('Unsupported network');
    this.chainId = chainId;
    this.apiURL = config[this.chainId].apiURL;
    this.FeeNoApi = new FeeNoApiRequests(this.apiURL);
  }

  /**
   * Make and send estimate request with given estimation data and user's provider.
   * @example
   * ```typescript
   * import { FeeNo, FeeNoApiRequests }  from 'feeno-sdk';
   *
   * const feeNo = new RemmeRest();
   * const FeeNoRequest = feeNo.createFeenoRequest(estimateParams, provider);
   * ```
   * @param {Estimate} params
   * @param {Web3Provider} provider
   * @returns {Promise<FeeNoRequest>}
   */
  async createFeenoRequest(params: Estimate, provider: Web3Provider): Promise<FeeNoRequest> {
    const response = await this.FeeNoApi.createFeenoRequest(params);
    return new FeeNoRequest(response, provider, this.chainId, this.FeeNoApi);
  }

  /**
   * Returns the object of supported tokens to pay fee.
   * @example
   * ```typescript
   * import { FeeNo, FeeNoApiRequests }  from 'feeno-sdk';
   *
   * const feeNo = new RemmeRest();
   * const supportedTokens = feeNo.getTokens();
   * ```
   * @returns {Promise<SupportedTokens>}
   */
  async getTokens(): Promise<SupportedTokens> {
    const response = await this.FeeNoApi.getTokens();
    return response;
  }
}
