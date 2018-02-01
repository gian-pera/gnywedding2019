'use strict'

const rsvp = require('../model/rsvp')
const captcha = require('../model/captcha')

const _ = require('lodash')
const logger = require('winston')

exports.index = function (req, res) {
  logger.info('base-controller.js: Index page requested.')

  res.render('index')
}

exports.rsvp = function (req, res) {
  logger.info('base-controller.js: RSVP invoked.', JSON.stringify(req.body))

  rsvp.validate(req.body)

  captcha.verify(req.body.captcha)
    .then(data => {
      logger.debug(`base-controller.js:\ndata: ${data}`)
      res.status(200).json(JSON.parse(data))
    }).catch(err => {
      logger.error(`base-controller.js: ${err}`)

      res.status(500).json({
        status: 500,
        message: 'An unexpected error occurred while verifying your captcha. Please try again later.'
      })
    })
}
