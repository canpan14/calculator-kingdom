'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const authEvents = require('./auth/events')
const deckEvents = require('./deck/events')

$(() => {
  setAPIOrigin(location, config)
})

$(() => {
  authEvents.registerHandlers()
  deckEvents.registerHandlers()
  authEvents.loadInitialPage()
})
