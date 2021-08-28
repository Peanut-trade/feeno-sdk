import { BNLike } from 'ethereumjs-util';
import { BundleId, TransactionStatus } from './share';
export interface TransactionResult {
    status: TransactionStatus;
    bundleId: BundleId;
    bloxrouteUrl: string;
    transactions: string[];
    transactionHashes: string[];
    broadcastCount: BNLike;
    blocksCountToResubmit: BNLike;
}
