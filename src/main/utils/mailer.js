'use strict'

const _ = require('lodash')
const fs = require('fs')
const logger = require('winston')

const MAILER_ADDRESS = 'gnywedding@gmail.com'
const ADMIN_ADRESSES = [`${MAILER_ADDRESS}`, 'ustgian25@gmail.com', 'alyssa.denaya@gmail.com']

const MAILER = require('gmail-send')({
  user: `${MAILER_ADDRESS}`,
  pass: 'oczsmmygcspphbjv'
})

exports.send = async function(data) {

  logger.info(`mailer.js: Email Requested for ${JSON.stringify(data)}`)

  await notifyAdmins(data)

  //if (!_.isEmpty(data.email) {
  //  notifyAttendee(data.email)
  //}
}

async function notifyAdmins(data) {

  logger.info(`mailer.js - Notifying admins...`)

  var body = await _.template(fs.readFileSync(
    `${__dirname}/../resources/email/new_attendee.html`))(data)

  logger.debug(`mailer.js - Email template for admins generated:\n ${body}`)

  await MAILER({
    to: ADMIN_ADRESSES,
    subject: `Wedding RSVP Submitted - ${data.name}`,
    html: `${body}`
  }, function(err, res) {
    logger.info(`mailer.js: ${JSON.stringify(res)}`)
    if(!_.isNil(err)) {
      logger.error(`mailer.js: ${JSON.stringify(err)}`)
    }
  })

  logger.info(`mailer.js - Notified admins.`)
}
