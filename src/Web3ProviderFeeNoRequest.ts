import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import Common, { Hardfork } from '@ethereumjs/common';
import { ethers } from 'ethers';
import { AddressLike } from 'ethereumjs-util';
import { FeeMarketEIP1559Transaction } from '@ethereumjs/tx';
import { abi } from '@openzeppelin/contracts/build/contracts/ERC721.json';
import ERC20ABI from './abis/ERC20.json';
import config from '../config/default.json';
import { FeeNoApiRequests } from './FeeNoApiRequests';
import {
  approveRequired,
  EstimationResponse,
  ExType,
  RequestParams,
  Speed,
  SubmissionResponse,
  SupportedChains,
  TxData,
} from './types';
import { IFeeNoRequest } from './FeeNoRequest';

export class Web3ProviderFeeNoRequest implements IFeeNoRequest {
  estimationResponse: EstimationResponse;

  provider: Web3Provider;

  signer: JsonRpcSigner;

  chainId: SupportedChains;

  FeeNoApi: FeeNoApiRequests;

  common: Common;

  maxFeePerGas: string;

  maxPriorityFeePerGas: string;

  bundleId: string;

  /**
   * FeeNoRequests instance is being created in the FeeNo class by it's createFeenoRequest() method.
   * @example
   * Implementation with all params.
   * ```typescript
   * import { FeeNo, FeeNoApiRequests }  from '@peanut.trade/feeno-sdk';
   *
   * const feeNo = new FeeNo();
   * const feeNoRequest = feeNo.createFeenoRequest(estimateData, provider);
   * ```
   */
  constructor(
    estimationResponse: EstimationResponse,
    provider: Web3Provider,
    chainId: SupportedChains,
    FeeNoApi: FeeNoApiRequests
  ) {
    this.estimationResponse = estimationResponse;
    this.provider = provider;
    this.signer = provider.getSigner();
    this.chainId = chainId;
    this.FeeNoApi = FeeNoApi;
    this.common = new Common({ chain: this.chainId, hardfork: Hardfork.London });
    this.maxFeePerGas = ethers.utils.parseUnits(
      this.estimationResponse.marketGasPriceGwei.baseFee.toString(),
      'gwei'
    )._hex;
    this.maxPriorityFeePerGas = ethers.utils.hexlify(ethers.BigNumber.from(0));
    this.bundleId = '0x';
  }

  private async _getSignature(signerAddress: AddressLike, hashedMessage: string): Promise<string> {
    const signature = this.provider.provider.request
      ? await this.provider.provider.request({
          method: 'eth_sign',
          params: [signerAddress, hashedMessage],
        })
      : '';

    if (!signature) throw new Error('No signature data');

    return signature;
  }

  private _getSwapType(sendRequest: RequestParams): ExType {
    if (sendRequest.exType !== 'optimalSwap') {
      return sendRequest.exType;
    }
    if (
      !this.estimationResponse.executionSwap.cexSwap.miningSpeed[sendRequest.speed].ethGasFee ||
      this.estimationResponse.executionSwap.dexSwap.miningSpeed[sendRequest.speed].ethGasFee <
        this.estimationResponse.executionSwap.cexSwap.miningSpeed[sendRequest.speed].ethGasFee
    ) {
      return ExType.DEX;
    }
    return ExType.CEX;
  }

  private async _approveTokensUse(exType: ExType): Promise<string[]> {
    const txsToApprove: approveRequired[] = this.estimationResponse.approveRequired;
    const signerAdress: string = await this.signer.getAddress();
    const ERC721Abi = abi;
    return Promise.all(
      txsToApprove.map(async (txToApprove, txIndex) => {
        const approvalGasUsage =
          this.estimationResponse.executionSwap[exType].simulations.approve[txIndex].gasUsage;
        let gasLimit;
        let contract;
        let amountOrId;
        if (txToApprove.tokenId) {
          contract = new ethers.Contract(
            txToApprove.tokenAddress.toString(),
            ERC721Abi,
            this.provider
          );
          amountOrId = txToApprove.tokenId;
          gasLimit = ethers.BigNumber.from(55000);
        } else {
          contract = new ethers.Contract(
            txToApprove.tokenAddress.toString(),
            ERC20ABI,
            this.provider
          );
          amountOrId = txToApprove.amount;
          gasLimit = ethers.BigNumber.from(approvalGasUsage);
        }
        const tx = await contract.populateTransaction.approve(txToApprove.spender, amountOrId);
        const nonce = (await this.signer.getTransactionCount()) + txIndex;

        const txData = {
          type: '0x02',
          chainId: ethers.utils.hexlify(this.chainId),
          nonce: ethers.utils.hexlify(ethers.BigNumber.from(nonce), { hexPad: 'left' }),
          maxFeePerGas: this.maxFeePerGas,
          maxPriorityFeePerGas: this.maxPriorityFeePerGas,
          gasLimit: ethers.utils.hexlify(gasLimit, { hexPad: 'left' }),
          to: tx.to,
          value: ethers.utils.hexlify(ethers.BigNumber.from(0)),
          data: tx.data,
        };
        return this._signTransfer(txData, signerAdress);
      })
    );
  }

  private async _approveETHTransfer(exType: ExType, speed: Speed, nonce: number): Promise<string> {
    let value;
    const signerAddress: AddressLike = await this.signer.getAddress();
    const feenoContractAddress: AddressLike = config[this.chainId].FeeNoContract;

    const ETHGasFee = (
      this.estimationResponse.executionSwap[exType].miningSpeed[speed].ethGasFee *
      10 ** 18
    ).toFixed(0);

    if (this.estimationResponse.ETHQuantity) {
      value = this.estimationResponse.erc20TokenToPayFee
        ? ethers.BigNumber.from(this.estimationResponse.ETHQuantity).add(ETHGasFee).toString()
        : this.estimationResponse.ETHQuantity;
    } else {
      value = ETHGasFee;
    }

    const tx = {
      type: '0x02',
      chainId: ethers.utils.hexlify(this.chainId),
      nonce: ethers.utils.hexlify(
        ethers.BigNumber.from((await this.signer.getTransactionCount()) + nonce),
        {
          hexPad: 'left',
        }
      ),
      maxFeePerGas: this.maxFeePerGas,
      maxPriorityFeePerGas: this.maxPriorityFeePerGas,
      gasLimit: ethers.utils.hexlify(ethers.BigNumber.from(21100), { hexPad: 'left' }),
      from: signerAddress,
      to: feenoContractAddress,
      value: ethers.utils.hexlify(ethers.BigNumber.from(value)),
    };
    return this._signTransfer(tx, signerAddress);
  }

  private async _signTransfer(tx: TxData, signerAddress: AddressLike): Promise<string> {
    const txFactory = FeeMarketEIP1559Transaction.fromTxData(tx, { common: this.common });
    const unsignedTx = txFactory.getMessageToSign();
    const signature = await this._getSignature(signerAddress, ethers.utils.hexlify(unsignedTx));

    const signatureParts = ethers.utils.splitSignature(signature);

    const txWithSignature = txFactory._processSignature(
      signatureParts.v,
      Buffer.from(ethers.utils.arrayify(signatureParts.r)),
      Buffer.from(ethers.utils.arrayify(signatureParts.s))
    );

    return ethers.utils.hexlify(txWithSignature.serialize());
  }

  private async _getExecuteAllowance(exType: ExType, speed: Speed): Promise<string> {
    const signerAdress: string = await this.signer.getAddress();
    const metadataToSign =
      this.estimationResponse.executionSwap[exType].miningSpeed[speed].data.messageForSing;

    const message = ethers.utils.arrayify(metadataToSign);

    const hashedMessage = ethers.utils.keccak256(
      ethers.utils.concat([
        ethers.utils.toUtf8Bytes('\x19Ethereum Signed Message:\n'),
        ethers.utils.toUtf8Bytes(String(message.length)),
        message,
      ])
    );

    const signature = await this._getSignature(signerAdress, hashedMessage);

    return signature;
  }

  /**
   * Send submit transaction.
   * @example
   * ```typescript
   * import { FeeNo, FeeNoApiRequests }  from '@peanut.trade/feeno-sdk';
   *
   * const feeNo = new FeeNo( 1 );
   * const feeNoRequest = feeNo.createFeenoRequest(estimateData, provider);
   * // If submit is successful you will get SubmissionResponse typed response.
   * const submitResponce = FeeNoRequestInstance.send(sendRequest);
   * ```
   * @param {RequestParams} sendRequest
   * @returns {Promise<SubmissionResponse>}
   */
  async send(sendRequest: RequestParams): Promise<SubmissionResponse> {
    const eXtype = this._getSwapType(sendRequest);

    const approvalTxRawData = await this._approveTokensUse(eXtype);

    if (this.estimationResponse.ETHQuantity || !this.estimationResponse.erc20TokenToPayFee) {
      approvalTxRawData.push(
        await this._approveETHTransfer(eXtype, sendRequest.speed, approvalTxRawData.length)
      );
    }

    const metadataSignature = await this._getExecuteAllowance(eXtype, sendRequest.speed);

    const txToSubmit = {
      estimationId: this.estimationResponse.id,
      approvalTxRawData,
      userSign: metadataSignature,
      processingMode: eXtype,
      miningSpeed: sendRequest.speed,
      blocksCountToResubmit: 20,
    };

    const response = await this.FeeNoApi.send(txToSubmit);
    this.bundleId = response.bundleId ? response.bundleId : this.bundleId;
    return response;
  }

  /**
   * Cancel submit request if it's not mined yet.
   * @example
   * ```typescript
   * import { FeeNo, FeeNoApiRequests }  from '@peanut.trade/feeno-sdk';
   *
   * const feeNo = new FeeNo( 1 );
   * const feeNoRequest = feeNo.createFeenoRequest(estimateData, provider);
   * // errorMessage: "Transaction not found"
   * const cancelRequest1 = feeNoRequest.cancel();
   *
   * const submitResponce = feeNoRequest.send(sendRequest);
   * // Transaction will be canceled. You will get SubmissionResponse type response.
   * const cancelRequest2 = feeNoRequest.cancel();
   *
   * // Transaction is canceled already. You will get the same response as from cancelRequest2.
   * const cancelRequest3 = feeNoRequest.cancel();
   * ```
   * @returns {Promise<SubmissionResponse>}
   */
  async cancel(): Promise<SubmissionResponse> {
    return this.FeeNoApi.cancel(this.bundleId);
  }

  /**
   * Get the transaction status.
   * @example
   * ```typescript
   * import { FeeNo, FeeNoApiRequests }  from '@peanut.trade/feeno-sdk';
   *
   * const feeNo = new FeeNo( 1 );
   * const feeNoRequest= feeNo.createFeenoRequest(estimateData, provider);
   * // errorMessage: "Please, send transaction first"
   * const cancelRequest1 = feeNoRequest.status();
   *
   * const submitResponce = feeNoRequest.send(sendRequest);
   * // You will get SubmissionResponse type response
   * const cancelRequest2 = feeNoRequest.status();
   * ```
   * @returns {Promise<SubmissionResponse>}
   */
  async getStatus(): Promise<SubmissionResponse> {
    return this.FeeNoApi.getStatus(this.bundleId);
  }
}
