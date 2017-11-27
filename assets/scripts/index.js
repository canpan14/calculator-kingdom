'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events')
const homeEvents = require('./home/events')

$(() => {
  setAPIOrigin(location, config)
})

$(() => {
  authEvents.registerHandlers()
  homeEvents.registerHandlers()
  authEvents.loadInitialPage()
})
