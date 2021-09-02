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
    adressFrom: AddressLike;
    /**
     * Message to sign
     * @type {string}
     * @memberof Sign
     */
    messaage: string;
}
