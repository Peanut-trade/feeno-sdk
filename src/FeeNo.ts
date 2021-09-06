import axios from 'axios';
import { config } from 'dotenv';

import {
  BundleId,
  CancellationResponse,
  Estimate,
  EstimationResponse,
  SubmissionResponse,
  Submit,
  TransactionStatus,
  TransactionResult,
} from './types';

config();

export interface IFeeNo {
  estimate(params: Estimate): Promise<EstimationResponse>;
  submit(params: Submit): Promise<SubmissionResponse>;
  cancel(bundleId: BundleId): Promise<CancellationResponse>;
  getTransaction(bundleId: BundleId): Promise<TransactionResult>;
}
export class FeeNo implements IFeeNo {
  private apiUrl = 'http://localhost:6200/v1';

  // TODO: Need to add provider as argument for constructor and save for sign
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

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
  submit(params: Submit): Promise<SubmissionResponse> {
    return Promise.resolve({
      bundleId: '876e4567-e31b-54d3-b975-286573480000',
      status: TransactionStatus.InprogressType,
      broadcastCount: 0,
      blocksCountToResubmit: 20,
      transactionHashes: [
        '0x5b42ee656f8afc14a715180ed083f8fe260050fc8f5f5ecf133a205ed08ea3fc',
        '0x404eed83889ccc298d63ea664cfe887873f873849f430fb2c65c799b026ab26f',
        '0x46bd0cc25add06ff8847c66bf3374dc65c291a1f7ff4ee3734fdb99f38d84d9a',
      ],
    });
  }
}
