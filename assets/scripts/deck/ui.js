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
  deck.cards.forEach(card => {
    card.cardInDeckId = deck.cards_in_deck.find(cid => cid.card_id === card.id).id
  })
  return gameApi.getCards()
    .then((getCardsResponse) => {
      cardsDb = getCardsResponse.cards
      cardsDb.forEach(card => {
        if (!cardsInDeck.find(cid => cid.id === card.id)) {
          cardsNotInDeck.push(card)
        }
      })
      $('#decksView').append(deckManagementHbs({ deck: deck }))
      $('#multiselect').append(cardOptionHbs({ cards: cardsNotInDeck }))
    })
}

const getDecksFailure = function () {
  sharedUI.failureNotification('Failed to retrieve users armies, try again later.')
}

const getDeckFailure = function () {
  sharedUI.failureNotification('Failed to retrieve this army, try again later.')
}

const createDeckFailure = function () {
  sharedUI.failureNotification('Failed to create a new army, try again later.')
}

const updateDeckFailure = function () {
  sharedUI.failureNotification('Failed to update this army, try again later.')
}

const addCardSuccess = function () {
  return true
}

const addCardFailure = function () {
  sharedUI.failureNotification('Failed to update this army, try again later.')
  return false
}

const removeCardSuccess = function () {
  return true
}

const removeCardFailure = function () {
  sharedUI.failureNotification('Failed to update this army, try again later.')
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
