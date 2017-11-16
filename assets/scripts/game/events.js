'use strict'

const ui = require('./ui')
const calcLogic = require('./calcLogic')
const cardLogic = require('./cardLogic')

const initializeGamePage = function () {
  ui.initGameView()
  calcLogic.initCalcLogic()
  cardLogic.initCards()
}

const registerHandlers = function () {
}

module.exports = {
  registerHandlers,
  initializeGamePage
}
