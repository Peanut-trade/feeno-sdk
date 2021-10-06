import { AddressLike } from 'ethereumjs-util';

export interface TxData {
  type?: string;
  chainId?: string;
  nonce?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  gasLimit?: string;
  to?: AddressLike | undefined;
  value?: string;
  data?: string | undefined;
}
