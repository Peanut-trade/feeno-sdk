export interface Estimate {
  /**
   * Transaction type (transfer | swap (not supported yet) | add_liquidity (not supported yet))
   * @type {string}
   * @memberof Estimate
   */
  transactionType: string;
  /**
   * Transaction body
   * @type {any}
   * @memberof Estimate
   */
  transactionBody: any;
  /**
   * User address
   * @type {string}
   * @memberof Estimate
   */
  addressFrom: string;
  /**
   * Token to spend in order to cover network fee
   * @type {string}
   * @memberof Estimate
   */
  erc20TokenToPayFee: string;
  /**
   * Fee payer: receiver or sender
   * @type {string}
   * @memberof Estimate
   */
  feePayer: string;
}
