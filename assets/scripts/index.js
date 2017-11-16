'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const gameEvents = require('./game/events')

$(() => {
  setAPIOrigin(location, config)
})

$(() => {
  gameEvents.initializeGamePage()
})
