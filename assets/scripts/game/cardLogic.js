'use strict'

const Card = require('../shared-objects/Card')
const ui = require('./ui')

const initCards = function (cards) {
  cards = cards.cards.map(card => {
    return Card.createCard(card)
  })
  ui.displayCards(cards)
}

module.exports = {
  initCards
}
