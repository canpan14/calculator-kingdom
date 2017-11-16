'use strict'

const ui = require('./ui')
const calcLogic = require('./calcLogic')

const initializeGamePage = function () {
  ui.initGameView()
  calcLogic.initCalcLogic()
}

const registerHandlers = function () {
}

module.exports = {
  registerHandlers,
  initializeGamePage
}
