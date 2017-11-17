'use strict'

const ui = require('./ui')
const calcLogic = require('./calcLogic')
const cardLogic = require('./cardLogic')
const gameLogic = require('./gameLogic')

const initializeGamePage = function () {
  ui.initGameView()
  calcLogic.initCalcLogic()
  cardLogic.initCards()
  $('.playingCard').on('click', (event) => {
    gameLogic.playCard(event, calcLogic.getCurrentlySelectedNumber())
  })
}

const registerHandlers = function () {
}

module.exports = {
  registerHandlers,
  initializeGamePage
}
