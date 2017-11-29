'use strict'

const config = require('../config')
const store = require('../store')

const getDecks = function () {
  return $.ajax({
    url: config.apiOrigin + 'decks',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const getDeck = function (id) {
  return $.ajax({
    url: config.apiOrigin + 'decks/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const createDeck = function (data) {
  return $.ajax({
    url: config.apiOrigin + 'decks',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      deck: {
        name: 'Unnamed Army'
      }
    }
  })
}

const updateDeck = function (id, name) {
  return $.ajax({
    url: config.apiOrigin + 'decks/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      deck: {
        name: name
      }
    }
  })
}

const addCardToDeck = function (deckId, cardId) {
  return $.ajax({
    url: config.apiOrigin + 'cards_in_decks',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      cards_in_deck: {
        deck_id: deckId,
        card_id: cardId
      }
    }
  })
}

const removeCardFromDeck = function (id) {
  return $.ajax({
    url: config.apiOrigin + 'cards_in_decks/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteDeck = function (id) {
  return $.ajax({
    url: config.apiOrigin + 'decks/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  getDecks,
  getDeck,
  createDeck,
  updateDeck,
  addCardToDeck,
  removeCardFromDeck,
  deleteDeck
}
