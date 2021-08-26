/**
 *
 * @export
 * @interface CancellationResponse
 */
import type { BundleId } from './share';

export interface CancellationResponse {
  bundleId: BundleId;
  status: boolean;
}
