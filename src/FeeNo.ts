import axios from 'axios';
import { Web3Provider } from '@ethersproject/providers';
import { AddressLike } from 'ethereumjs-util';
import * as config from '../config/default.json';
import { FeeNoRequest } from './FeeNoRequest';
import { Estimate, SupportedTokens, SupportedChains } from './types';

interface IFeeNo {
  createFeenoRequest(params: Estimate, provider: Web3Provider): Promise<FeeNoRequest>;
  getTokens(): Promise<SupportedTokens>;
}

export class FeeNo implements IFeeNo {
  chainId: SupportedChains;

  apiURL: string;

  FeeNoContract: AddressLike;

  constructor(chainId: number) {
    this.chainId = chainId === SupportedChains.MAINNET ? chainId : 0;
    if (!chainId) throw new Error('Unsuported network');
    this.apiURL = config[this.chainId].apiURL;
  }

  async createFeenoRequest(params: Estimate, provider: Web3Provider): Promise<FeeNoRequest> {
    const url = `${this.apiURL}/estimate`;
    const response = await axios.post(url, params);
    return new FeeNoRequest(response.data, provider, this.chainId);
  }

  async getTokens(): Promise<SupportedTokens> {
    const url = `${this.apiURL}/tokens`;
    const response = await axios.get(url);
    return response.data.tokens;
  }
}
