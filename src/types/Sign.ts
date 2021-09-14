import { AddressLike } from 'ethereumjs-util';

/**
 *
 * @export
 * @interface Sign
 */
export interface Sign {
  /**
   * User address
   * @type {AddressLike}
   * @memberof Sign
   */
  addressFrom: AddressLike;
  /**
   * Message to sign
   * @type {string}
   * @memberof Sign
   */
  message: Buffer | string;
}
