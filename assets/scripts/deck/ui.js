'use strict'

const decksViewHbs = require('../templates/decksView.handlebars')
const deckManagementHbs = require('../templates/deckManagement.handlebars')
const noDecksHbs = require('../templates/noDecks.handlebars')
const cardOptionHbs = require('../templates/cardOption.handlebars')

const gameApi = require('../game/api')
const sharedUI = require('../shared/ui')
let cardsDb = []

const showDecksView = function (response) {
  sharedUI.clearAllViews()
  if (response.decks) {
    const decks = response.decks.map(deck => {
      deck.cardCount = deck.cards_in_deck.length
      return deck
    })
    $('#decksView').append(decksViewHbs({decks: decks}))
  } else {
    $('#decksView').append(noDecksHbs())
  }
}

const showDeckManagement = function (response) {
  const deck = Object.assign({}, response.deck)
  sharedUI.clearAllViews()
  const cardsInDeck = deck.cards
  const cardsNotInDeck = []
  return gameApi.getCards()
    .then((getCardsResponse) => {
      cardsDb = getCardsResponse.cards
      cardsDb.forEach(card => {
        if (cardsInDeck.includes(card)) {
          cardsInDeck.push(card)
        } else {
          cardsNotInDeck.push(card)
        }
      })
      $('#decksView').append(deckManagementHbs({deck: deck}))
      $('#multiselect').append(cardOptionHbs({ cards: cardsNotInDeck }))
    })
}

const getDecksFailure = function () {
  console.log('failed to get users decks')
}

const getDeckFailure = function () {
  console.log('faied to get deck')
}

const createDeckFailure = function () {
  console.log('failed to create deck')
}

const updateDeckFailure = function () {
  console.log('failed to update deck')
}

const addCardSuccess = function () {
  return true
}

const addCardFailure = function () {
  return false
}

const removeCardSuccess = function () {
  return true
}

const removeCardFailure = function () {
  return false
}

module.exports = {
  showDecksView,
  getDecksFailure,
  createDeckFailure,
  getDeckFailure,
  showDeckManagement,
  updateDeckFailure,
  addCardSuccess,
  addCardFailure,
  removeCardSuccess,
  removeCardFailure
}
