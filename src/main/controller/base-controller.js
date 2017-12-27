'use strict'

const logger = require('winston')

/* Creates a new repository.
 */
exports.index = function (req, res) {
  logger.info('base-controller.js: Index page requested.')

  res.render('index')
}
