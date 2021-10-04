import axios from 'axios';
import { Web3Provider } from '@ethersproject/providers';
import * as config from '../config/development.json';
import { FeeNoRequest } from './FeeNoRequest';
import { Estimate, SupportedTokens } from './types';

export class FeeNo {
  static async createFeenoRequest(params: Estimate, provider: Web3Provider): Promise<FeeNoRequest> {
    const url = `${config.apiURL}/estimate`;
    const response = await axios.post(url, params);
    return new FeeNoRequest(response.data, provider);
  }

  static async getTokens(): Promise<SupportedTokens> {
    const url = `${config.apiURL}/tokens`;
    const response = await axios.get(url);
    return response.data.tokens;
  }
}
