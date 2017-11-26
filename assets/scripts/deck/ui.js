'use strict'

const decksViewHbs = require('../templates/decksView.handlebars')
const deckManagementHbs = require('../templates/deckManagement.handlebars')
const noDecksHbs = require('../templates/noDecks.handlebars')
const cardOptionHbs = require('../templates/cardOption.handlebars')

const gameApi = require('../game/api')
let cardsDb = []

const showDecksView = function (response) {
  $('#gameView').empty()
  $('#decksView').empty()
  if (response.decks) {
    const decks = response.decks.map(deck => {
      deck.cardCount = deck.cards.length
      return deck
    })
    $('#decksView').append(decksViewHbs({decks: decks}))
  } else {
    $('#decksView').append(noDecksHbs())
  }
}

const showDeckManagement = function (response) {
  $('#decksView').empty()
  const cardIdsInDeck = response.deck.cards
  const cardsInDeck = []
  const cardsNotInDeck = []
  return gameApi.getCards()
    .then((getCardsResponse) => {
      cardsDb = getCardsResponse.cards
      cardsDb.forEach(card => {
        if (cardIdsInDeck.includes(card.id)) {
          cardsInDeck.push(card)
        } else {
          cardsNotInDeck.push(card)
        }
      })
      response.deck.cards = cardsInDeck
      $('#decksView').append(deckManagementHbs(response))
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

module.exports = {
  showDecksView,
  getDecksFailure,
  createDeckFailure,
  getDeckFailure,
  showDeckManagement,
  updateDeckFailure
}
