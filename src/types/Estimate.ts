import { AddressLike, BNLike } from 'ethereumjs-util';
import { TransactionBody, TransactionType } from './transactions';
import { EstimateStatus, EstimationId, FeePayerType } from './share';

/**
 *
 * @export
 * @interface Estimate
 */
export interface Estimate {
  /**
   * Transaction type
   * @type {TransactionType}
   * @memberof Estimate
   */
  transactionType: TransactionType;
  /**
   * Transaction body
   * @type {TransactionBody}
   * @memberof Estimate
   */
  transactionBody: TransactionBody;
  /**
   * User address
   * @type {AddressLike}
   * @memberof Estimate
   */
  addressFrom: AddressLike;
  /**
   * Token to spend in order to cover network fee
   * @type {AddressLike}
   * @memberof Estimate
   */
  erc20TokenToPayFee: AddressLike;
  /**
   * Fee payer: receiver or sender
   * @type {FeePayerType}
   * @memberof Estimate
   */
  feePayer: FeePayerType;
}

/**
 *
 * @export
 * @interface EstimationResponse
 */
export interface EstimationResponse {
  /**
   *
   * @type {boolean}
   * @memberof EstimationResponse
   */
  status?: boolean;
  /**
   *
   * @type {string}
   * @memberof EstimationResponse
   */
  id: EstimationId;
  /**
   *
   * @type {boolean}
   * @memberof EstimationResponse
   */
  approveRequired?: boolean;
  /**
   *
   * @type {MarketGasPriceGwei}
   * @memberof EstimationResponse
   */
  marketGasPriceGwei?: MarketGasPriceGwei;
  /**
   *
   * @type {FeePayerType}
   * @memberof EstimationResponse
   */
  feePayer?: FeePayerType;
  /**
   *
   * @type {ExecutionSwap}
   * @memberof EstimationResponse
   */
  executionSwap?: ExecutionSwap;
}

export interface MarketGasPriceGwei {
  baseFee: number;
  maxPriorityFeePerGas: {
    fast: number;
    medium: number;
    slow: number;
  };
}

export interface ExecutionSwap {
  dexSwap: {
    ethTokenPrice: number;
    totalGasUsage: number;
    simulations: {
      ethTransfer: {
        status: EstimateStatus;
        gasUsage: number;
      };
      approve: {
        id: EstimationId;
        status: EstimateStatus;
        gasUsage: number;
      };
      execute: {
        id: EstimationId;
        status: EstimateStatus;
        gasUsage: number;
      };
    };
    miningSpeed: {
      fast: MiningSpeed;
      medium: MiningSpeed;
      slow: MiningSpeed;
    };
  };
  cexSwap: { message: string };
}

export interface MiningSpeed {
  ethGasFee: number;
  tokenBasedGasFee: number;
  data: {
    transactions: [AddressLike, BNLike, string][];
    messageForSing: string;
  };
}
