'use strict'

const api = require('./api')
const ui = require('./ui')
const calcLogic = require('./calcLogic')
const calcState = require('./calcState')
const gameLogic = require('./gameLogic')

const initializeGamePage = function () {
  ui.initGameView()
  calcLogic.initCalcLogic()
  gameLogic.newGame()
    .then(() => {
      $('.playingCard').on('click', (event) => {
        if (gameLogic.playCard(event, calcState.getCurrentlySelectedNumber())) {
          ui.removeNumber(calcState.getCurrentlySelectedNumber())
          calcState.currentNumberWasUsedToPlayCard()
          if (gameLogic.areAllCardsPlayed()) {
            $('#fightButton').click()
          }
        }
      })
    })
    .then(() => {
      $('#fightButton').on('click', (event) => {
        event.preventDefault()
        $('#fightButton').attr('disabled', true)
        gameLogic.fightRound()
        $('#fightButton').attr('disabled', false)
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
