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
  if (_.isEmpty(name)) {
    errors.push('Name must be specified.')
  }

  var email = _.trim(data.email)
  if (_.isEmpty(email)) {
    errors.push('Email must be specified.')
  }

  var attendees = _.trim(data.attendees)
  if (_.isEmpty(attendees)) {
    errors.push('No. of attendees must be specified.')
  } else {
    attendees = _.toNumber(attendees)
    if (_.isNaN(attendees)) {
      errors.push('No of attendees must be a number')
    } else if (attendees <= 0) {
      errors.push('No of attendees must be at least 1')
    }
  }

  if (!_.isEmpty(errors)) {
    throw new ApiError(_.join(errors, '\n'))
  }
}
