'use strict'

const sharedUI = require('../shared/ui')

const homeViewHbs = require('../templates/homeView.handlebars')
const chooseADeckHbs = require('../templates/chooseADeck.handlebars')
const noDecksForChooseADeckHbs = require('../templates/noDecksForChooseADeck.handlebars')
const helpViewHbs = require('../templates/helpView.handlebars')

const showHomePage = function () {
  sharedUI.clearAllViews()
  $('#homeView').append(homeViewHbs())
}

const showChooseADeck = function (response) {
  sharedUI.clearAllViews()
  if (response.decks) {
    const decks = response.decks.map(deck => {
      deck.cardCount = deck.cards.length
      return deck
    })
    $('#homeView').append(chooseADeckHbs({decks: decks}))
  } else {
    $('#homeView').append(noDecksForChooseADeckHbs())
  }
}

const showHelp = function () {
  sharedUI.clearAllViews()
  $('#homeView').append(helpViewHbs())
  $('#help-content').scrollspy({ target: '#navbar-help' })
}

const chooseADeckFailure = function () {
  sharedUI.failureNotification('Failed to load the users armies, try again later.')
}

module.exports = {
  showHomePage,
  showChooseADeck,
  chooseADeckFailure,
  showHelp
}
