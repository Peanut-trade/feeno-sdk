import { Estimate, FeeNo, TransactionStatus, TransactionType } from '../src';

describe('FeeNo', () => {
  const feeNo = new FeeNo();

  it('cancel should return correct value', async () => {
    const feeNoCancel = await feeNo.cancel('123e4567-e89b-12d3-a456-426655440000');
    expect(feeNoCancel.bundleId).toBe('123e4567-e89b-12d3-a456-426655440000');
    expect(feeNoCancel.status).toBe(true);
  });

  it('getTransaction should return correct value', async () => {
    const feeNoGetTransaction = await feeNo.getTransaction('657e4567-e89b-12d3-a456-442266880000');
    expect(feeNoGetTransaction.status).toBe(TransactionStatus.InprogressType);
    expect(feeNoGetTransaction.bundleId).toBe('657e4567-e89b-12d3-a456-442266880000');
    expect(feeNoGetTransaction.bloxrouteUrl).toBe('6ghfj5-345kfg-rty4576feh');
    expect(feeNoGetTransaction.transactions.length).toBe(3);
    expect(feeNoGetTransaction.transactionHashes.length).toBe(3);
    expect(feeNoGetTransaction.broadcastCount).toBe('5000000');
    expect(feeNoGetTransaction.blocksCountToResubmit).toBe('30');
  });

  it('submit should return correct value', async () => {
    const feeNoSubmit = await feeNo.submit({
      estimationId: '876e4567-e31b-54d3-b975-286573480000',
      approvalTxRawData: '0x4d7eEf7AbFF862f7F6CdB58421528CcC7fEb4E74',
      userSign: 'hdbvh4bdjfhvn334jh4h5jchdoj5jk23kjklkj4jgngfobj698970mlkn',
      processingMode: 'dexSwap',
      miningSpeed: 'slow',
      blocksCountToResubmit: 15,
    });
    expect(feeNoSubmit.bundleId).toBe('876e4567-e31b-54d3-b975-286573480000');
    expect(feeNoSubmit.status).toBe(TransactionStatus.InprogressType);
    expect(feeNoSubmit.broadcastCount).toBe(0);
    expect(feeNoSubmit.blocksCountToResubmit).toBe(20);
    expect(feeNoSubmit.transactionHashes?.length).toBe(3);
  });

  it('estimate should return json', async () => {
    jest.setTimeout(20000);
    const data: Estimate = {
      transactionType: TransactionType.TransferType,
      transactionBody: {
        addressTo: '0xbF8FE9240804b898BFA455967d8691cC7102E12E',
        amount: 500,
        tokenContractAddress: '0xc9D7E158d07965c661FD3421DC5DB1176856DFb5',
      },
      addressFrom: '0xC6BdFA7e694db5621CdcB7242d1931FC586f6d1d',
      erc20TokenToPayFee: '0xc9D7E158d07965c661FD3421DC5DB1176856DFb5',
      feePayer: 'receiver',
    };

    console.log(await feeNo.estimate(data));
  });
});
