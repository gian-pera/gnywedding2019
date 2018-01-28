'use strict'

const bodyParser = require('body-parser')
const express = require('express')
const methodOverride = require('method-override')

const ApiError = require('./utils/api-error')
const Logger = require('./utils/logger')

const BaseRouter = require('./router/base-router')

const app = express()

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

app.use('/', express.static(`${__dirname}/resources`))

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())

app.use('/', BaseRouter)

app.use(function (req, res) {
  res.status(404).json({
    'code': 404,
    'message': `The requested URL was not found.`
  })
})

app.use(function (err, req, res, next) {
  Logger.error(err.stack)

  if (err instanceof ApiError) {
    res.status(400).json({
      'code': 400,
      'message': err.message
    })
  } else {
    res.status(500).json({
      'code': 500,
      'message': 'An unexpected error was encountered while processing your request. For more info, you may refer to the application logs.'
    })
  }
})

const port = process.env.PORT || 8080
app.listen(port, function () {
  Logger.info(`GnYWedding started in port: ${port}`)
})
