'use strict'

const _ = require('lodash')
const logger = require('winston')
const mailer = require('gmail-send')({
  user: 'gnywedding@gmail.com',
  pass: 'oczsmmygcspphbjv'
})

exports.send = async function(data) {

  logger.info(`mailer.js: Email Requested for ${JSON.stringify(data)}`)

  await mailer({
    to: 'ustgian25@gmail.com',
    subject: 'Wedding RSVP Submitted',
    html: '<p>RSVP Details:</p>' +
      `<p><b>Name:</b> ${data.name}` +
      `<p><b>Email:</b> ${data.email}` +
      `<p><b>Phone:</b> ${data.phone}`
  }, function(err, res) {
    logger.info(`mailer.js: ${JSON.stringify(res)}`)
    if(!_.isNil(err)) {
      logger.error(`mailer.js: ${JSON.stringify(err)}`)
    }
  })
}
