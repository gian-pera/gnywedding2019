'use strict'

const ApiError = require('../utils/api-error')

const logger = require('winston')
const request = require('request-promise')

const verifyUri = 'https://www.google.com/recaptcha/api/siteverify'
const secret = '6LcV5kIUAAAAAKXynO8_RxXTuRNiv7-RTnN05H31'

exports.verify = async function(captcha) {
  var url = `${verifyUri}?secret=${secret}&response=${captcha}`
  logger.debug(`captcha.js - Invoking POST request: ${url}`)

  return await request.post(url)
}
