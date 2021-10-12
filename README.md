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

## Example

```js
import { FeeNo }  from '@peanut.trade/feeno-sdk';

const feeNo = new FeeNo(1);

const supportedTokens = feeNo.getTokens();

const feeNoRequest = feeNo.createFeenoRequest(estimateParams, provider);
//feeNoRequest is an instance of FeeNoApiRequests

const submitResponce = feeNoRequest.send({ exType: "dexSwap", speed: "medium" });

const cancelResponce = feeNoRequest.cancel();

const statusResponce = feeNoRequest.status();
```

## Commands

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

## [Documentation](https://peanut-trade.github.io/feeno-sdk/index.html)
