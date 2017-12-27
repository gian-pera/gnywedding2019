'use strict'

const _ = require('lodash')
const fs = require('fs')
const moment = require('moment-timezone')
const path = require('path')
const winston = require('winston')

// Set up the moments module
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss zz [(GMT]ZZ[)]'
moment.tz.setDefault(moment.tz.guess())

/* Sets the root directory of the log files
 */
const rootDir = path.normalize(_.join([__dirname, '/../logs']))
if (!fs.existsSync(rootDir)) {
  fs.mkdirSync(rootDir)
}

winston.configure({
  transports: [
    new (winston.transports.File)({
      name: 'server',
      dirname: `${rootDir}`,
      filename: 'server-info.log',
      level: 'info',
      json: false,
      handleExceptions: true,
      timestamp: () => moment().format(DATE_FORMAT),
      formatter: (options) => format(options)
    }),
    new (winston.transports.File)({
      name: 'server-error',
      dirname: `${rootDir}`,
      filename: 'server-error.log',
      level: 'error',
      json: false,
      handleExceptions: true,
      timestamp: () => moment().format(DATE_FORMAT),
      formatter: (options) => format(options)
    })
  ]
})

/* Enables debug logging for the dev environment
*/
if (_.isEqual(process.env.NODE_ENV, 'DEV')) {
  winston.add(winston.transports.File, {
    name: 'server-debug',
    dirname: `${rootDir}`,
    filename: 'server-debug.log',
    level: 'debug',
    json: false,
    handleExceptions: true,
    timestamp: () => moment().format(DATE_FORMAT),
    formatter: (options) => format(options)
  })

  winston.add(winston.transports.Console, {
    prettyPrint: 'true',
    level: 'debug'
  })
} else {
  winston.add(winston.transports.Console, {
    prettyPrint: 'true',
    level: 'info'
  })
}

function format (options) {
  return options.timestamp() + ' ' + options.level.toUpperCase() + ' ' +
    (_.isNil(options.message) ? '' : options.message) +
    (_.isNil(options.meta) || Object.keys(options.meta).length === 0
        ? '' : ' (' + JSON.stringify(options.meta) + ')')
}

module.exports = winston
