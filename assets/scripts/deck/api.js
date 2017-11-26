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
    data
  })
}

const updateDeck = function (id, name, cards) {
  return $.ajax({
    url: config.apiOrigin + 'decks/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: {
      deck: {
        name: name,
        cards: cards
      }
    }
  })
}

module.exports = {
  getDecks,
  getDeck,
  createDeck,
  updateDeck
}
