/**
 *
 * @export
 * @interface Submit
 */
import { EstimationId } from './share';
export interface Submit {
    /**
     * Identifier of estimation result received during estimate operation
     * @type {string}
     * @memberof Submit
     */
    estimationId: EstimationId;
    /**
     * Signed approval transaction (if estimation result param \"approveRequired\" == true). Hex | null
     * @type {string}
     * @memberof Submit
     */
    approvalTxRawData?: string;
    /**
     * Signed message
     * @type {string}
     * @memberof Submit
     */
    userSign: string;
    /**
     * Processing mode (dexSwap | cexSwap)
     * @type {string}
     * @memberof Submit
     */
    processingMode: string;
    /**
     * Mining speed (fast | medium | slow)
     * @type {string}
     * @memberof Submit
     */
    miningSpeed: string;
    /**
     * Blocks count to retry resubmit. Feeno will resubmit transactions, until they will be mined or required blocks count will pass. Default: 10. (optional)
     * @type {number}
     * @memberof Submit
     */
    blocksCountToResubmit?: number;
}
/**
 *
 * @export
 * @interface SubmissionResponse
 */
export interface SubmissionResponse {
    /**
     *
     * @type {string}
     * @memberof SubmissionResponse
     */
    bundleId?: string;
    /**
     *
     * @type {string}
     * @memberof SubmissionResponse
     */
    status?: string;
    /**
     *
     * @type {number}
     * @memberof SubmissionResponse
     */
    broadcastCount?: number;
    /**
     *
     * @type {number}
     * @memberof SubmissionResponse
     */
    blocksCountToResubmit?: number;
    /**
     *
     * @type {Array<string>}
     * @memberof SubmissionResponse
     */
    transactionHashes?: string[];
}
