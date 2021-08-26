import { AddressLike } from 'ethereumjs-util';
import { TransactionBody, TransactionType } from './transactions';
import { FeePayerType } from './share';

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
  transactionBody: TransactionBody[];
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
   * @type {boolean}
   * @memberof EstimationResponse
   */
  approveRequired?: boolean;
  /**
   *
   * @type {any}
   * @memberof EstimationResponse
   */
  marketGasPriceGwei?: any;
  /**
   *
   * @type {any}
   * @memberof EstimationResponse
   */
  executionSwap?: any;
  /**
   *
   * @type {FeePayerType}
   * @memberof EstimationResponse
   */
  feePayer?: FeePayerType;
}
