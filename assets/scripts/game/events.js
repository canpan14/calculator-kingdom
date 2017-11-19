'use strict'

const api = require('./api')
const ui = require('./ui')
const calcLogic = require('./calcLogic')
const calcState = require('./calcState')
const cardLogic = require('./cardLogic')
const gameLogic = require('./gameLogic')

const initializeGamePage = function () {
  ui.initGameView()
  calcLogic.initCalcLogic()
  api.getCards()
    .then(cardLogic.initCards)
    .then(() => {
      $('.playingCard').on('click', (event) => {
        if (gameLogic.playCard(event, calcState.getCurrentlySelectedNumber())) {
          ui.removeNumber(calcState.getCurrentlySelectedNumber())
          calcState.currentNumberWasUsedToPlayCard()
          if (gameLogic.areAllCardsPlayed()) {
            console.log('Played all the cards! End turn automatically.')
          }
        }
      })
    })
    .catch(console.error)
}

const registerHandlers = function () {
}

module.exports = {
  registerHandlers,
  initializeGamePage
}
