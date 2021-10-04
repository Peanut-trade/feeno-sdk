import axios from 'axios';
import { config } from 'dotenv';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

import {
  BundleId,
  CancellationResponse,
  Estimate,
  EstimationResponse,
  SubmissionResponse,
  Submit,
  TransactionStatus,
  TransactionResult,
  Sign,
} from './types';

config();

export interface IFeeNo {
  estimate(params: Estimate): Promise<EstimationResponse>;
  submit(params: Submit): Promise<SubmissionResponse>;
  cancel(bundleId: BundleId): Promise<CancellationResponse>;
  getTransaction(bundleId: BundleId): Promise<TransactionResult>;
  signTransaction(params: Sign): Promise<string>;
  signMessage(params: Sign): Promise<string>;
}
export class FeeNo implements IFeeNo {
  private apiUrl = 'https://devapi-feeno.peanut.trade/v1';

  public address = '0xFee1708400f01f2Bb8848Ef397C1a2F4C25c910B';

  provider?: Web3Provider;

  // TODO: Need to add provider as argument for constructor and save for sign
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(provider?: Web3Provider) {
    this.provider = provider;
  }

  cancel(bundleId: BundleId): Promise<CancellationResponse> {
    return Promise.resolve({ bundleId, status: true });
  }

  async estimate(params: Estimate): Promise<EstimationResponse> {
    const url = `${this.apiUrl}/estimate`;
    const response = await axios.post(url, params);
    return response.data;
  }

  // TODO: need to impliment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTransaction(bundleId: BundleId): Promise<TransactionResult> {
    return Promise.resolve({
      status: TransactionStatus.InprogressType,
      bundleId: '657e4567-e89b-12d3-a456-442266880000',
      bloxrouteUrl: '6ghfj5-345kfg-rty4576feh',
      transactions: [
        '0x613b12c803dd1c8565ee94dd86d1d772c81b46c1',
        '0xb344147ea92cf102cd92ec996b8986ddca4a918e',
        '0x5c3f649ffdbc91a247ac45fc2c4c63f9319e5135',
      ],
      transactionHashes: [
        '0x46bd0cc25add06ff8847c66bf3374dc65c291a1f7ff4ee3734fdb99f38d84d9a',
        '0x58aa8e4bf444463ee2cf2200b767a92f32f29ff4bfd626b25b9b5d2470ef7f02',
        '0x1319932d1f4ed6034c6d06c176628f9001d864555c00ecf8834b961852a50484',
      ],
      broadcastCount: '5000000',
      blocksCountToResubmit: '30',
    });
  }

  // TODO: need to impliment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async submit(params: Submit): Promise<SubmissionResponse> {
    const url = `${this.apiUrl}/submit`;
    const response = await axios.post(url, params);
    return response.data;
  }

  async signTransaction(params: Sign): Promise<string> {
    if (!this.provider) {
      throw new Error('No provider specified');
    }
    if (!this.provider.provider.request) return '';

    const signature = await this.provider.provider.request({
      method: 'eth_sign',
      params: [params.addressFrom, ethers.utils.hexlify(params.message)],
    });

    return signature;
  }

  async signMessage(params: Sign): Promise<string> {
    if (!this.provider) {
      throw new Error('No provider specified');
    }
    if (!this.provider.provider.request) return '';

    const message = ethers.utils.arrayify(params.message);

    const hashedMessage = ethers.utils.keccak256(
      ethers.utils.concat([
        ethers.utils.toUtf8Bytes('\x19Ethereum Signed Message:\n'),
        ethers.utils.toUtf8Bytes(String(message.length)),
        message,
      ])
    );

    const signature = await this.provider.provider.request({
      method: 'eth_sign',
      params: [params.addressFrom, hashedMessage],
    });

    return signature;
  }
}
