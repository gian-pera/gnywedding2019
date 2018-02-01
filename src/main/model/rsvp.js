'use strict'

const ApiError = require('../utils/api-error')

const _ = require('lodash')
const logger = require('winston')

exports.validate = function(data) {

  if (_.isEmpty(data)) {
    throw new ApiError('No form data was recieved.')
  }

  var errors = [];

  if (_.isEmpty(data.name)) {
    errors.push('Name must be specified')
  }

  if (_.isEmpty(data.email) && _.isEmpty(data.phone)) {
    errors.push('Email and/or phone # must be specified')
  }

  if (!_.isEmpty(errors)) {
    throw new ApiError(_.join(errors, '\n'))
  }
}
