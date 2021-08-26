import { BNLike } from 'ethereumjs-util';
import { BundleId, TransactionStatus } from './share';
import { TransactionDetails } from './transactions';

export interface TransactionResult {
  status: TransactionStatus;
  bundleId: BundleId;
  bloxrouteUrl: string;
  transactions: TransactionDetails[];
  transactionHashes: string;
  broadcastCount: BNLike;
  blocksCountToResubmit: BNLike;
}
