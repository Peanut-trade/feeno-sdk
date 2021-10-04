import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers';
import Common, { Hardfork } from '@ethereumjs/common';
import axios from 'axios';
import { ethers } from 'ethers';
import { abi } from '@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json';
import { FeeMarketEIP1559Transaction } from '@ethereumjs/tx';
import { AddressLike } from 'ethereumjs-util';
import * as config from '../config/development.json';
import ERC20ABI from './abis/ERC20.json';
import {
  EstimationResponse,
  approveRequired,
  RequestParams,
  SubmissionResponse,
  ExType,
  Speed,
} from './types/index';

export interface IFeeNoRequest {
  send(sendRequest: RequestParams): Promise<SubmissionResponse>;
  cancel(): Promise<string>;
  getStatus(): Promise<SubmissionResponse | string>;
}

export class FeeNoRequest implements IFeeNoRequest {
  estimationResponse: EstimationResponse;

  provider: Web3Provider;

  signer: JsonRpcSigner;

  chainId: number;

  common: Common;

  maxFeePerGas: string;

  maxPriorityFeePerGas: string;

  bundleId: string;

  constructor(estimationResponse: EstimationResponse, provider: Web3Provider) {
    this.estimationResponse = estimationResponse;
    this.provider = provider;
    this.signer = provider.getSigner();
    this.chainId = config.network.id;
    this.common = new Common({ chain: this.chainId, hardfork: Hardfork.London });
    this.maxFeePerGas = ethers.utils.parseUnits(
      this.estimationResponse.marketGasPriceGwei.baseFee.toString(),
      'gwei'
    )._hex;
    this.maxPriorityFeePerGas = ethers.utils.hexlify(ethers.BigNumber.from(0));
    this.bundleId = '0x';
  }

  private _getSwapType(sendRequest: RequestParams): ExType {
    if (sendRequest.exType === 'optimalSwap') {
      if (
        this.estimationResponse.executionSwap.dexSwap.miningSpeed[sendRequest.speed].ethGasFee >
        this.estimationResponse.executionSwap.cexSwap.miningSpeed[sendRequest.speed].ethGasFee
      ) {
        return 'dexSwap';
      }
      return 'cexSwap';
    }
    return sendRequest.exType;
  }

  private async _approveTokensUse(exType: ExType): Promise<string[]> {
    const txsToApprove: approveRequired[] = this.estimationResponse.approveRequired;
    const signerAdress: string = await this.signer.getAddress();

    return Promise.all(
      txsToApprove.map(async (txToApprove, txIndex) => {
        const approvalGasUsage =
          this.estimationResponse.executionSwap[exType].simulations.approve[txIndex].gasUsage;
        let gasLimit;
        let contract;
        let amountOrId;
        if (txToApprove.tokenId) {
          contract = new ethers.Contract(txToApprove.tokenAddress.toString(), abi, this.provider);
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

        const txFactory = FeeMarketEIP1559Transaction.fromTxData(
          {
            type: '0x02',
            chainId: ethers.utils.hexlify(this.chainId),
            nonce: ethers.utils.hexlify(ethers.BigNumber.from(nonce), { hexPad: 'left' }),
            maxFeePerGas: this.maxFeePerGas,
            maxPriorityFeePerGas: this.maxPriorityFeePerGas,
            gasLimit: ethers.utils.hexlify(gasLimit, { hexPad: 'left' }),
            to: tx.to,
            value: ethers.utils.hexlify(ethers.BigNumber.from(0)),
            data: tx.data,
          },
          { common: this.common }
        );

        const unsignedTx = txFactory.getMessageToSign();
        const signature = this.provider.provider.request
          ? await this.provider.provider.request({
              method: 'eth_sign',
              params: [signerAdress, ethers.utils.hexlify(unsignedTx)],
            })
          : '';

        const signatureParts = ethers.utils.splitSignature(signature);

        const txWithSignature = txFactory._processSignature(
          signatureParts.v,
          Buffer.from(ethers.utils.arrayify(signatureParts.r)),
          Buffer.from(ethers.utils.arrayify(signatureParts.s))
        );

        return ethers.utils.hexlify(txWithSignature.serialize());
      })
    );
  }

  private async _approveETHTransfer(exType: ExType, speed: Speed, nonce: number): Promise<string> {
    let value;
    const signerAddress: AddressLike = await this.signer.getAddress();
    const feenoContractAddress: AddressLike = config.feeno.contract;

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

    const txFactory = FeeMarketEIP1559Transaction.fromTxData(tx, { common: this.common });

    const unsignedTx = txFactory.getMessageToSign();
    const signature = this.provider.provider.request
      ? await this.provider.provider.request({
          method: 'eth_sign',
          params: [signerAddress, ethers.utils.hexlify(unsignedTx)],
        })
      : '';

    const signatureParts = ethers.utils.splitSignature(signature);

    const txWithSignature = txFactory._processSignature(
      signatureParts.v,
      Buffer.from(ethers.utils.arrayify(signatureParts.r)),
      Buffer.from(ethers.utils.arrayify(signatureParts.s))
    );

    return ethers.utils.hexlify(txWithSignature.serialize());
  }

  private async _approveTransaction(exType: ExType, speed: Speed): Promise<string> {
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

    const signature = this.provider.provider.request
      ? await this.provider.provider.request({
          method: 'eth_sign',
          params: [signerAdress, hashedMessage],
        })
      : '';

    return signature;
  }

  // setup approve transactions with sign and send submit request
  async send(sendRequest: RequestParams): Promise<SubmissionResponse> {
    const eXtype = this._getSwapType(sendRequest);

    const approvalTxRawData = await this._approveTokensUse(eXtype);

    if (this.estimationResponse.ETHQuantity || !this.estimationResponse.erc20TokenToPayFee) {
      approvalTxRawData.push(
        await this._approveETHTransfer(eXtype, sendRequest.speed, approvalTxRawData.length)
      );
    }

    const metadataSignature = await this._approveTransaction(eXtype, sendRequest.speed);

    const txToSubmit = {
      estimationId: this.estimationResponse.id,
      approvalTxRawData,
      userSign: metadataSignature,
      processingMode: eXtype,
      miningSpeed: sendRequest.speed,
      blocksCountToResubmit: 20,
    };

    const url = `${config.apiURL}/submit`;
    const response = await axios.post(url, txToSubmit);
    this.bundleId = response.data.bundleId;
    return response.data;
  }

  // cancel current request
  async cancel(): Promise<string> {
    const url = `${config.apiURL}/bundle/${this.bundleId}/cancel`;
    const response = await axios.delete(url);
    return response.data;
  }

  // get status of current request
  async getStatus(): Promise<SubmissionResponse> {
    const url = `${config.apiURL}/bundle/${this.bundleId}`;
    const response = await axios.get(url);
    return response.data;
  }
}
