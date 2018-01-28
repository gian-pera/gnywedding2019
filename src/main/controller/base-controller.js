'use strict'

const logger = require('winston')

exports.index = function (req, res) {
  logger.info('base-controller.js: Index page requested.')

  res.render('index')
}

exports.rsvp = function (req, res) {
 logger.info('base-controller.js: RSVP invoked.', JSON.stringify(req.body))

 res.status(200)
}
