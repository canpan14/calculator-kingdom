'use strict'

const ui = require('./ui')
const calcLogic = require('./calcLogic')
const calcState = require('./calcState')
const cardLogic = require('./cardLogic')
const gameLogic = require('./gameLogic')

const initializeGamePage = function () {
  ui.initGameView()
  calcLogic.initCalcLogic()
  cardLogic.initCards()
  $('.playingCard').on('click', (event) => {
    if (gameLogic.playCard(event, calcState.getCurrentlySelectedNumber())) {
      ui.removeNumber(calcState.getCurrentlySelectedNumber())
      calcState.currentNumberWasUsedToPlayCard()
      if (gameLogic.areAllCardsPlayed()) {
        console.log('Played all the cards! End turn automatically.')
      }
    }
  })
}

const registerHandlers = function () {
}

module.exports = {
  registerHandlers,
  initializeGamePage
}
