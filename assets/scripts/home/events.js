'use strict'

const ui = require('./ui')
const deckApi = require('../deck/api')
const deckEvents = require('../deck/events')
const gameEvents = require('../game/events')

const initializeHomePage = function () {
  ui.showHomePage()
  $('#playGame').on('click', showChooseADeck)
  $('#manageDecks').on('click', deckEvents.showDecksView)
  $('#help').on('click', ui.showHelp)
}

const showChooseADeck = function () {
  deckApi.getDecks()
    .then(ui.showChooseADeck)
    .then(() => {
      $('#viewDecks').on('click', deckEvents.showDecksView)
      $('#useRandomDeck').on('click', startGame)
      $('#myDecks > tbody > tr').on('click', startGame)
    })
    .catch(ui.chooseADeckFailure)
}

const startGame = function (event) {
  event.preventDefault()
  if (isNaN(event.currentTarget.id)) {
    gameEvents.initializeGamePage()
  } else {
    deckApi.getDeck(event.currentTarget.id)
      .then(response => {
        gameEvents.initializeGamePage(response.deck.cards)
      })
      .catch(ui.chooseADeckFailure)
  }
}

const registerHandlers = function () {
  $('#home').on('click', initializeHomePage)
}

module.exports = {
  registerHandlers,
  initializeHomePage
}
