
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./feeno-sdk.cjs.production.min.js')
} else {
  module.exports = require('./feeno-sdk.cjs.development.js')
}
