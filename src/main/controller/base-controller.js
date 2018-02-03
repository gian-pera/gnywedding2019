'use strict'

const captcha = require('../model/captcha')
const rsvp = require('../model/rsvp')
const mailer = require('../utils/mailer')

const _ = require('lodash')
const logger = require('winston')

exports.index = function (req, res) {
  logger.info('base-controller.js: Index page requested.')

  res.render('index')
}

exports.rsvp = function (req, res, next) {
  logger.info('base-controller.js: RSVP invoked.', JSON.stringify(req.body))

  rsvp.validate(req.body)

  captcha.verify(req.body.captcha)
    .then(data => {
      logger.debug(`base-controller.js: Captcha Result: ${data}`)

      var result = JSON.parse(data)
      res.status(200).json(result)
      if (result.success == true) {
        try {
          next(mailer.send(req.body))
        } catch(err) {
          logger.error(`base-controller.js: ${err.stack}`)
        }
      }
    }).catch(err => {
      logger.error(`base-controller.js: ${err}`)

      res.status(500).json({
        status: 500,
        message: 'An unexpected error occurred while verifying your captcha. Please try again later.'
      })
    })
}
