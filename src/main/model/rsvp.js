'use strict'

const ApiError = require('../utils/api-error')

const _ = require('lodash')
const logger = require('winston')

exports.validate = function(data) {

  if (_.isEmpty(data)) {
    throw new ApiError('No form data was recieved.')
  }

  var errors = [];
  var name = _.trim(data.name)
  var email = _.trim(data.email)
  var phone = _.trim(data.phone)

  if (_.isEmpty(name))) {
    errors.push('Name must be specified')
  }

  if (_.isEmpty(email) && _.isEmpty(phone)) {
    errors.push('Email and/or phone # must be specified')
  }

  if (!_.isEmpty(errors)) {
    throw new ApiError(_.join(errors, '\n'))
  }
}
