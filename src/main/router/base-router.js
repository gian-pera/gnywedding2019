'use strict'

const express = require('express')

const BaseController = require('../controller/base-controller')

const router = express.Router()
router.get('/', BaseController.index)
router.post('/rsvp', BaseController.rsvp)

module.exports = router
