'use strict'

module.exports = function APIError (message, extra) {
  Error.captureStackTrace(this, this.constructor)
  this.name = this.constructor.name
  this.message = message
  this.extra = extra
}

require('util').inherits(module.exports, Error)
