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

  await notifyAttendee(data)
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

async function notifyAttendee(data) {

  logger.info(`mailer.js - Notifying attendee...`)

  var body = await _.template(fs.readFileSync(
    `${__dirname}/../resources/email/rsvp.html`))(data)

  logger.debug(`mailer.js - Email template for attendee generated:\n ${body}`)

  await MAILER({
    to: `${data.email}`,
    subject: `RSVP Confirmation for Gian & Yssa's Wedding`,
    html: `${body}`
  }, function(err, res) {
    logger.info(`mailer.js: ${JSON.stringify(res)}`)
    if(!_.isNil(err)) {
      logger.error(`mailer.js: ${JSON.stringify(err)}`)
    }
  })

  logger.info(`mailer.js - Notified attendee.`)
}
