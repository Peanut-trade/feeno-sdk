import { AddressLike, BNLike } from 'ethereumjs-util';

export interface TxData {
  type?: string;
  chainId?: string;
  nonce?: BNLike;
  maxFeePerGas?: BNLike;
  maxPriorityFeePerGas?: BNLike;
  gasLimit?: BNLike;
  to?: AddressLike | undefined;
  value?: BNLike;
  data?: string | undefined;
}
