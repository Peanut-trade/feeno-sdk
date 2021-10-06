import axios from 'axios';
import Common, { Hardfork } from '@ethereumjs/common';
import { ethers } from 'ethers';
import { abi } from '@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json';
import { FeeMarketEIP1559Transaction } from '@ethereumjs/tx';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }

      _next(undefined);
    });
  };
}

function createCommonjsModule(fn, module) {
  return (module = { exports: {} }), fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var runtime = (function (exports) {
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.
    var $Symbol = typeof Symbol === 'function' ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || '@@iterator';
    var asyncIteratorSymbol = $Symbol.asyncIterator || '@@asyncIterator';
    var toStringTagSymbol = $Symbol.toStringTag || '@@toStringTag';

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
      return obj[key];
    }
    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, '');
    } catch (err) {
      define = function (obj, key, value) {
        return (obj[key] = value);
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);

      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);

      return generator;
    }
    exports.wrap = wrap;

    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: 'normal', arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: 'throw', arg: err };
      }
    }

    var GenStateSuspendedStart = 'suspendedStart';
    var GenStateSuspendedYield = 'suspendedYield';
    var GenStateExecuting = 'executing';
    var GenStateCompleted = 'completed';

    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};

    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}

    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (
      NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)
    ) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp =
      (GeneratorFunctionPrototype.prototype =
      Generator.prototype =
        Object.create(IteratorPrototype));
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, 'constructor', GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, 'constructor', GeneratorFunction);
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      'GeneratorFunction'
    );

    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ['next', 'throw', 'return'].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === 'function' && genFun.constructor;
      return ctor
        ? ctor === GeneratorFunction ||
            // For the native GeneratorFunction constructor, the best we can
            // do is to check its .name property.
            (ctor.displayName || ctor.name) === 'GeneratorFunction'
        : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, 'GeneratorFunction');
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function (arg) {
      return { __await: arg };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === 'throw') {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value && typeof value === 'object' && hasOwn.call(value, '__await')) {
            return PromiseImpl.resolve(value.__await).then(
              function (value) {
                invoke('next', value, resolve, reject);
              },
              function (err) {
                invoke('throw', err, resolve, reject);
              }
            );
          }

          return PromiseImpl.resolve(value).then(
            function (unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration.
              result.value = unwrapped;
              resolve(result);
            },
            function (error) {
              // If a rejected Promise was yielded, throw the rejection back
              // into the async generator function so it can be handled there.
              return invoke('throw', error, resolve, reject);
            }
          );
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return (previousPromise =
          // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise
            ? previousPromise.then(
                callInvokeWithMethodAndArg,
                // Avoid propagating failures to Promises returned by later
                // invocations of the iterator.
                callInvokeWithMethodAndArg
              )
            : callInvokeWithMethodAndArg());
      }

      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;

    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;

      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);

      return exports.isGeneratorFunction(outerFn)
        ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function (result) {
            return result.done ? result.value : iter.next();
          });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;

      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error('Generator is already running');
        }

        if (state === GenStateCompleted) {
          if (method === 'throw') {
            throw arg;
          }

          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === 'next') {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === 'throw') {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === 'return') {
            context.abrupt('return', context.arg);
          }

          state = GenStateExecuting;

          var record = tryCatch(innerFn, self, context);
          if (record.type === 'normal') {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done,
            };
          } else if (record.type === 'throw') {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.
            context.method = 'throw';
            context.arg = record.arg;
          }
        }
      };
    }

    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === 'throw') {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator['return']) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = 'return';
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === 'throw') {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = 'throw';
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === 'throw') {
        context.method = 'throw';
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = 'throw';
        context.arg = new TypeError('iterator result is not an object');
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value;

        // Resume execution at the desired location (see delegateYield).
        context.next = delegate.nextLoc;

        // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.
        if (context.method !== 'return') {
          context.method = 'next';
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      }

      // The delegate iterator is finished, so forget it and continue with
      // the outer generator.
      context.delegate = null;
      return ContinueSentinel;
    }

    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);

    define(Gp, toStringTagSymbol, 'Generator');

    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function () {
      return this;
    });

    define(Gp, 'toString', function () {
      return '[object Generator]';
    });

    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = 'normal';
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: 'root' }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();

      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === 'function') {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i];
                  next.done = false;
                  return next;
                }
              }

              next.value = undefined$1;
              next.done = true;

              return next;
            };

          return (next.next = next);
        }
      }

      // Return an iterator with no values.
      return { next: doneResult };
    }
    exports.values = values;

    function doneResult() {
      return { value: undefined$1, done: true };
    }

    Context.prototype = {
      constructor: Context,

      reset: function (skipTempReset) {
        this.prev = 0;
        this.next = 0;
        // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;

        this.method = 'next';
        this.arg = undefined$1;

        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === 't' && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },

      stop: function () {
        this.done = true;

        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === 'throw') {
          throw rootRecord.arg;
        }

        return this.rval;
      },

      dispatchException: function (exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;
        function handle(loc, caught) {
          record.type = 'throw';
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = 'next';
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === 'root') {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle('end');
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, 'catchLoc');
            var hasFinally = hasOwn.call(entry, 'finallyLoc');

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error('try statement without catch or finally');
            }
          }
        }
      },

      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (
            entry.tryLoc <= this.prev &&
            hasOwn.call(entry, 'finallyLoc') &&
            this.prev < entry.finallyLoc
          ) {
            var finallyEntry = entry;
            break;
          }
        }

        if (
          finallyEntry &&
          (type === 'break' || type === 'continue') &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc
        ) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = 'next';
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },

      complete: function (record, afterLoc) {
        if (record.type === 'throw') {
          throw record.arg;
        }

        if (record.type === 'break' || record.type === 'continue') {
          this.next = record.arg;
        } else if (record.type === 'return') {
          this.rval = this.arg = record.arg;
          this.method = 'return';
          this.next = 'end';
        } else if (record.type === 'normal' && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },

      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },

      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === 'throw') {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }

        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error('illegal catch attempt');
      },

      delegateYield: function (iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc,
        };

        if (this.method === 'next') {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      },
    };

    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;
  })(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports
  );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === 'object') {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function('r', 'regeneratorRuntime = r')(runtime);
    }
  }
});

var network = {
  id: 5,
  name: 'goerli',
  explorer: 'https://goerli.etherscan.io',
};
var apiURL = 'http://localhost:6200/v1';
var feeno = {
  contract: '0xFee1708400f01f2Bb8848Ef397C1a2F4C25c910B',
};

var ERC20ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_spender',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_from',
        type: 'address',
      },
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
      {
        name: '_spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    payable: true,
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        name: 'spender',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
];

var FeeNoRequest = /*#__PURE__*/ (function () {
  function FeeNoRequest(estimationResponse, provider) {
    this.estimationResponse = estimationResponse;
    this.provider = provider;
    this.signer = provider.getSigner();
    this.chainId = network.id;
    this.common = new Common({
      chain: this.chainId,
      hardfork: Hardfork.London,
    });
    this.maxFeePerGas = ethers.utils.parseUnits(
      this.estimationResponse.marketGasPriceGwei.baseFee.toString(),
      'gwei'
    )._hex;
    this.maxPriorityFeePerGas = ethers.utils.hexlify(ethers.BigNumber.from(0));
  }

  var _proto = FeeNoRequest.prototype;

  _proto._getSwapType = function _getSwapType(sendRequest) {
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
  };

  _proto._approveTokensUse = /*#__PURE__*/ (function () {
    var _approveTokensUse2 = /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ runtime_1.mark(function _callee2(exType) {
        var _this = this;

        var txsToApprove, signerAdress;
        return runtime_1.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  txsToApprove = this.estimationResponse.approveRequired;
                  _context2.next = 3;
                  return this.signer.getAddress();

                case 3:
                  signerAdress = _context2.sent;
                  return _context2.abrupt(
                    'return',
                    Promise.all(
                      txsToApprove.map(
                        /*#__PURE__*/ (function () {
                          var _ref = _asyncToGenerator(
                            /*#__PURE__*/ runtime_1.mark(function _callee(txToApprove, txIndex) {
                              var approvalGasUsage,
                                gasLimit,
                                contract,
                                amountOrId,
                                tx,
                                nonce,
                                txFactory,
                                unsignedTx,
                                signature,
                                signatureParts,
                                txWithSignature;
                              return runtime_1.wrap(function _callee$(_context) {
                                while (1) {
                                  switch ((_context.prev = _context.next)) {
                                    case 0:
                                      approvalGasUsage =
                                        _this.estimationResponse.executionSwap[exType].simulations
                                          .approve[txIndex].gasUsage;

                                      if (txToApprove.tokenId) {
                                        contract = new ethers.Contract(
                                          txToApprove.tokenAddress.toString(),
                                          abi,
                                          _this.provider
                                        );
                                        amountOrId = txToApprove.tokenId;
                                        gasLimit = ethers.BigNumber.from(55000);
                                      } else {
                                        contract = new ethers.Contract(
                                          txToApprove.tokenAddress.toString(),
                                          ERC20ABI,
                                          _this.provider
                                        );
                                        amountOrId = txToApprove.amount;
                                        gasLimit = ethers.BigNumber.from(approvalGasUsage);
                                      }

                                      _context.next = 4;
                                      return contract.populateTransaction.approve(
                                        txToApprove.spender,
                                        amountOrId
                                      );

                                    case 4:
                                      tx = _context.sent;
                                      _context.next = 7;
                                      return _this.signer.getTransactionCount();

                                    case 7:
                                      _context.t0 = _context.sent;
                                      _context.t1 = txIndex;
                                      nonce = _context.t0 + _context.t1;
                                      txFactory = FeeMarketEIP1559Transaction.fromTxData(
                                        {
                                          type: '0x02',
                                          chainId: ethers.utils.hexlify(_this.chainId),
                                          nonce: ethers.utils.hexlify(
                                            ethers.BigNumber.from(nonce),
                                            {
                                              hexPad: 'left',
                                            }
                                          ),
                                          maxFeePerGas: _this.maxFeePerGas,
                                          maxPriorityFeePerGas: _this.maxPriorityFeePerGas,
                                          gasLimit: ethers.utils.hexlify(gasLimit, {
                                            hexPad: 'left',
                                          }),
                                          to: tx.to,
                                          value: ethers.utils.hexlify(ethers.BigNumber.from(0)),
                                          data: tx.data,
                                        },
                                        {
                                          common: _this.common,
                                        }
                                      );
                                      unsignedTx = txFactory.getMessageToSign();

                                      if (!_this.provider.provider.request) {
                                        _context.next = 18;
                                        break;
                                      }

                                      _context.next = 15;
                                      return _this.provider.provider.request({
                                        method: 'eth_sign',
                                        params: [signerAdress, ethers.utils.hexlify(unsignedTx)],
                                      });

                                    case 15:
                                      _context.t2 = _context.sent;
                                      _context.next = 19;
                                      break;

                                    case 18:
                                      _context.t2 = '';

                                    case 19:
                                      signature = _context.t2;
                                      signatureParts = ethers.utils.splitSignature(signature);
                                      txWithSignature = txFactory._processSignature(
                                        signatureParts.v,
                                        Buffer.from(ethers.utils.arrayify(signatureParts.r)),
                                        Buffer.from(ethers.utils.arrayify(signatureParts.s))
                                      );
                                      return _context.abrupt(
                                        'return',
                                        ethers.utils.hexlify(txWithSignature.serialize())
                                      );

                                    case 23:
                                    case 'end':
                                      return _context.stop();
                                  }
                                }
                              }, _callee);
                            })
                          );

                          return function (_x2, _x3) {
                            return _ref.apply(this, arguments);
                          };
                        })()
                      )
                    )
                  );

                case 5:
                case 'end':
                  return _context2.stop();
              }
            }
          },
          _callee2,
          this
        );
      })
    );

    function _approveTokensUse(_x) {
      return _approveTokensUse2.apply(this, arguments);
    }

    return _approveTokensUse;
  })();

  _proto._approveETHTransfer = /*#__PURE__*/ (function () {
    var _approveETHTransfer2 = /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ runtime_1.mark(function _callee3(exType, speed, nonce) {
        var value,
          signerAddress,
          feenoContractAddress,
          ETHGasFee,
          tx,
          txFactory,
          unsignedTx,
          signature,
          signatureParts,
          txWithSignature;
        return runtime_1.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  _context3.next = 2;
                  return this.signer.getAddress();

                case 2:
                  signerAddress = _context3.sent;
                  feenoContractAddress = feeno.contract;
                  ETHGasFee = (
                    this.estimationResponse.executionSwap[exType].miningSpeed[speed].ethGasFee *
                    Math.pow(10, 18)
                  ).toFixed(0);

                  if (this.estimationResponse.ETHQuantity) {
                    value = this.estimationResponse.erc20TokenToPayFee
                      ? ethers.BigNumber.from(this.estimationResponse.ETHQuantity)
                          .add(ETHGasFee)
                          .toString()
                      : this.estimationResponse.ETHQuantity;
                  } else {
                    value = ETHGasFee;
                  }

                  _context3.t0 = ethers.utils.hexlify(this.chainId);
                  _context3.t1 = ethers.utils;
                  _context3.t2 = ethers.BigNumber;
                  _context3.next = 11;
                  return this.signer.getTransactionCount();

                case 11:
                  _context3.t3 = _context3.sent;
                  _context3.t4 = nonce;
                  _context3.t5 = _context3.t3 + _context3.t4;
                  _context3.t6 = _context3.t2.from.call(_context3.t2, _context3.t5);
                  _context3.t7 = {
                    hexPad: 'left',
                  };
                  _context3.t8 = _context3.t1.hexlify.call(
                    _context3.t1,
                    _context3.t6,
                    _context3.t7
                  );
                  _context3.t9 = this.maxFeePerGas;
                  _context3.t10 = this.maxPriorityFeePerGas;
                  _context3.t11 = ethers.utils.hexlify(ethers.BigNumber.from(21100), {
                    hexPad: 'left',
                  });
                  _context3.t12 = signerAddress;
                  _context3.t13 = feenoContractAddress;
                  _context3.t14 = ethers.utils.hexlify(ethers.BigNumber.from(value));
                  tx = {
                    type: '0x02',
                    chainId: _context3.t0,
                    nonce: _context3.t8,
                    maxFeePerGas: _context3.t9,
                    maxPriorityFeePerGas: _context3.t10,
                    gasLimit: _context3.t11,
                    from: _context3.t12,
                    to: _context3.t13,
                    value: _context3.t14,
                  };
                  txFactory = FeeMarketEIP1559Transaction.fromTxData(tx, {
                    common: this.common,
                  });
                  unsignedTx = txFactory.getMessageToSign();

                  if (!this.provider.provider.request) {
                    _context3.next = 32;
                    break;
                  }

                  _context3.next = 29;
                  return this.provider.provider.request({
                    method: 'eth_sign',
                    params: [signerAddress, ethers.utils.hexlify(unsignedTx)],
                  });

                case 29:
                  _context3.t15 = _context3.sent;
                  _context3.next = 33;
                  break;

                case 32:
                  _context3.t15 = '';

                case 33:
                  signature = _context3.t15;
                  signatureParts = ethers.utils.splitSignature(signature);
                  txWithSignature = txFactory._processSignature(
                    signatureParts.v,
                    Buffer.from(ethers.utils.arrayify(signatureParts.r)),
                    Buffer.from(ethers.utils.arrayify(signatureParts.s))
                  );
                  return _context3.abrupt(
                    'return',
                    ethers.utils.hexlify(txWithSignature.serialize())
                  );

                case 37:
                case 'end':
                  return _context3.stop();
              }
            }
          },
          _callee3,
          this
        );
      })
    );

    function _approveETHTransfer(_x4, _x5, _x6) {
      return _approveETHTransfer2.apply(this, arguments);
    }

    return _approveETHTransfer;
  })();

  _proto._approveTransaction = /*#__PURE__*/ (function () {
    var _approveTransaction2 = /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ runtime_1.mark(function _callee4(exType, speed) {
        var signerAdress, metadataToSign, message, hashedMessage, signature;
        return runtime_1.wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  _context4.next = 2;
                  return this.signer.getAddress();

                case 2:
                  signerAdress = _context4.sent;
                  metadataToSign =
                    this.estimationResponse.executionSwap[exType].miningSpeed[speed].data
                      .messageForSing;
                  message = ethers.utils.arrayify(metadataToSign);
                  hashedMessage = ethers.utils.keccak256(
                    ethers.utils.concat([
                      ethers.utils.toUtf8Bytes('\x19Ethereum Signed Message:\n'),
                      ethers.utils.toUtf8Bytes(String(message.length)),
                      message,
                    ])
                  );

                  if (!this.provider.provider.request) {
                    _context4.next = 12;
                    break;
                  }

                  _context4.next = 9;
                  return this.provider.provider.request({
                    method: 'eth_sign',
                    params: [signerAdress, hashedMessage],
                  });

                case 9:
                  _context4.t0 = _context4.sent;
                  _context4.next = 13;
                  break;

                case 12:
                  _context4.t0 = '';

                case 13:
                  signature = _context4.t0;
                  return _context4.abrupt('return', signature);

                case 15:
                case 'end':
                  return _context4.stop();
              }
            }
          },
          _callee4,
          this
        );
      })
    );

    function _approveTransaction(_x7, _x8) {
      return _approveTransaction2.apply(this, arguments);
    }

    return _approveTransaction;
  })(); // setup approve transactions with sign and send submit request

  _proto.send =
    /*#__PURE__*/
    (function () {
      var _send = /*#__PURE__*/ _asyncToGenerator(
        /*#__PURE__*/ runtime_1.mark(function _callee5(sendRequest) {
          var eXtype, approvalTxRawData, metadataSignature, txToSubmit, url, response;
          return runtime_1.wrap(
            function _callee5$(_context5) {
              while (1) {
                switch ((_context5.prev = _context5.next)) {
                  case 0:
                    eXtype = this._getSwapType(sendRequest);
                    _context5.next = 3;
                    return this._approveTokensUse(eXtype);

                  case 3:
                    approvalTxRawData = _context5.sent;

                    if (
                      !(
                        this.estimationResponse.ETHQuantity ||
                        !this.estimationResponse.erc20TokenToPayFee
                      )
                    ) {
                      _context5.next = 10;
                      break;
                    }

                    _context5.t0 = approvalTxRawData;
                    _context5.next = 8;
                    return this._approveETHTransfer(
                      eXtype,
                      sendRequest.speed,
                      approvalTxRawData.length
                    );

                  case 8:
                    _context5.t1 = _context5.sent;

                    _context5.t0.push.call(_context5.t0, _context5.t1);

                  case 10:
                    _context5.next = 12;
                    return this._approveTransaction(eXtype, sendRequest.speed);

                  case 12:
                    metadataSignature = _context5.sent;
                    txToSubmit = {
                      estimationId: this.estimationResponse.id,
                      approvalTxRawData: approvalTxRawData,
                      userSign: metadataSignature,
                      processingMode: eXtype,
                      miningSpeed: sendRequest.speed,
                      blocksCountToResubmit: 20,
                    };
                    url = apiURL + '/submit';
                    _context5.next = 17;
                    return axios.post(url, txToSubmit);

                  case 17:
                    response = _context5.sent;
                    this.bundleId = response.data.bundleId;
                    return _context5.abrupt('return', response.data);

                  case 20:
                  case 'end':
                    return _context5.stop();
                }
              }
            },
            _callee5,
            this
          );
        })
      );

      function send(_x9) {
        return _send.apply(this, arguments);
      }

      return send;
    })(); // cancel current request

  _proto.cancel =
    /*#__PURE__*/
    (function () {
      var _cancel = /*#__PURE__*/ _asyncToGenerator(
        /*#__PURE__*/ runtime_1.mark(function _callee6() {
          var url, response;
          return runtime_1.wrap(
            function _callee6$(_context6) {
              while (1) {
                switch ((_context6.prev = _context6.next)) {
                  case 0:
                    url = apiURL + '/bundle/' + this.bundleId + '/cancel';
                    _context6.next = 3;
                    return axios['delete'](url);

                  case 3:
                    response = _context6.sent;
                    return _context6.abrupt('return', response.data);

                  case 5:
                  case 'end':
                    return _context6.stop();
                }
              }
            },
            _callee6,
            this
          );
        })
      );

      function cancel() {
        return _cancel.apply(this, arguments);
      }

      return cancel;
    })(); // get status of current request

  _proto.getStatus =
    /*#__PURE__*/
    (function () {
      var _getStatus = /*#__PURE__*/ _asyncToGenerator(
        /*#__PURE__*/ runtime_1.mark(function _callee7() {
          var url, response;
          return runtime_1.wrap(
            function _callee7$(_context7) {
              while (1) {
                switch ((_context7.prev = _context7.next)) {
                  case 0:
                    url = apiURL + '/bundle/' + this.bundleId;
                    _context7.next = 3;
                    return axios.get(url);

                  case 3:
                    response = _context7.sent;
                    return _context7.abrupt('return', response.data);

                  case 5:
                  case 'end':
                    return _context7.stop();
                }
              }
            },
            _callee7,
            this
          );
        })
      );

      function getStatus() {
        return _getStatus.apply(this, arguments);
      }

      return getStatus;
    })();

  return FeeNoRequest;
})();

var FeeNo = /*#__PURE__*/ (function () {
  function FeeNo() {}

  FeeNo.createFeenoRequest = /*#__PURE__*/ (function () {
    var _createFeenoRequest = /*#__PURE__*/ _asyncToGenerator(
      /*#__PURE__*/ runtime_1.mark(function _callee(params, provider) {
        var url, response;
        return runtime_1.wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                url = apiURL + '/estimate';
                _context.next = 3;
                return axios.post(url, params);

              case 3:
                response = _context.sent;
                return _context.abrupt('return', new FeeNoRequest(response.data, provider));

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee);
      })
    );

    function createFeenoRequest(_x, _x2) {
      return _createFeenoRequest.apply(this, arguments);
    }

    return createFeenoRequest;
  })();

  return FeeNo;
})();

var TransactionStatus;

(function (TransactionStatus) {
  TransactionStatus['InprogressType'] = 'inProgress';
})(TransactionStatus || (TransactionStatus = {}));

var TransactionType;

(function (TransactionType) {
  TransactionType['TransferType'] = 'transfer';
  TransactionType['SwapInputType'] = 'exactInput';
  TransactionType['SwapOutputType'] = 'exactOutput';
  TransactionType['SwapInputSingleType'] = 'exactInputSingle';
  TransactionType['SwapOutputSingleType'] = 'exactOutputSingle';
  TransactionType['ClaimFeeType'] = 'claimFee';
  TransactionType['CreatePositionType'] = 'createPosition';
  TransactionType['IncreaseLiquidityType'] = 'increaseLiquidity';
  TransactionType['DecreaseLiquidityType'] = 'decreaseLiquidity';
  TransactionType['CollectType'] = 'collect';
  TransactionType['SwapExactTokensForTokensType'] = 'swapExactTokensForTokens';
  TransactionType['SwapExactTokensForETHType'] = 'swapExactTokensForETH';
  TransactionType['SwapExactETHForTokensType'] = 'swapExactETHForTokens';
})(TransactionType || (TransactionType = {}));

export { FeeNo, FeeNoRequest, TransactionStatus, TransactionType };
//# sourceMappingURL=feeno-sdk.esm.js.map
