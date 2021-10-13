# FeeNo SDK

## Installing

Using npm:
```bash
$ npm install @peanut.trade/feeno-sdk
```

Using yarn:
```bash
$ yarn add @peanut.trade/feeno-sdk
```

## Examples

### Basic integration
```js
const ethers = require('ethers');
const { FeeNo } = require('@peanut.trade/feeno-sdk');

const chainId = 5; // 1 - mainnet, 5 - goerli (testnet)
const feeNo = new FeeNo(chainId);

const provider = new ethers.providers.InfuraProvider(chainId, "c0ce38826bf344708eff40ec84130fa9");

const demoWallet1 = new ethers.Wallet("6d5d157ad116ff71f75dc48dd678ca0f54d7d9af864a45f6d14cd4b579af4ac3", provider);
const demoWallet2 = new ethers.Wallet("b95de9da803db6367af3366037f0e7790e53dd811b95a639548420ca738f11e7");

(async () => {
    const supportedTokens = await feeNo.getTokens();
    console.log("Supported tokens:", supportedTokens);

    const estimateParams = {
        "transactionType": "transfer", // Supported types  https://peanut-trade.github.io/feeno-sdk/enums/TransactionType.html
        "transactionBody": {           // and their bodies https://peanut-trade.github.io/feeno-sdk/modules.html#TransactionBody
            "addressTo": demoWallet2.address,
            "amount": 1,
            "tokenContractAddress": "0xc9d7e158d07965c661fd3421dc5db1176856dfb5"
        },
        "addressFrom": demoWallet1.address,
        "erc20TokenToPayFee": "0xc9d7e158d07965c661fd3421dc5db1176856dfb5",
        "feePayer": "sender" // sender | receiver
    }

    console.log("estimation...");
    const feeNoRequest = await feeNo.createFeenoRequest(estimateParams, demoWallet1);
    //feeNoRequest is an instance of FeeNoApiRequests

    console.log("sending...");
    const submitResponse = await feeNoRequest.send({
        exType: "cexSwap", // dexSwap | cexSwap
        speed: "medium"    // fast | medium | slow
    });

    console.log("Result:", submitResponse);
})()
```

### Example of using Metamask
```js
import ethers  from 'ethers';
import { FeeNo }  from '@peanut.trade/feeno-sdk';

const feeNo = new FeeNo(chainId);

async function sendTransaction () {
    try {
        if (typeof  window.ethereum !== undefined) {
            await window.ethereum.enable()
            const provider = new ethers.providers.Web3Provider(window.ethereum); 
            const feeNoRequest = await feeNo.createFeenoRequest(estimateParams, demoWallet1);
            return await feeNoRequest.send({ exType: "cexSwap", speed: "medium"});
        } else {
            throw new Error("No injected web3 found")
        }
    } catch (e) {
        console.log(e)
        throw Error(e.message)
    }

    return false;
}
```

### Get transaction status
```js
    const statusResponse = await feeNoRequest.status();
```

### Cancel transaction
```js
    feeNoRequest.cancel();
```

## Commands

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

## [Documentation](https://peanut-trade.github.io/feeno-sdk/index.html)
