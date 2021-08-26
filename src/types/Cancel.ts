/**
 *
 * @export
 * @interface Cancel
 */
import type { BundleId } from './Share';

export interface Cancel {
  /**
   * Identifier of transaction
   * @type {BundleId}
   * @memberof Cancel
   */
  bundleId: BundleId;
}
