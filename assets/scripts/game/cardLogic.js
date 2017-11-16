'use strict'

const Card = require('../shared-objects/Card')
const ui = require('./ui')

const cards = [
  Card.createCard({
    name: 'Card 1',
    cost: 10,
    description: 'Card 1 Desc',
    attack: 'Card 1 attack',
    defense: 'Card 1 defense'
  }),
  Card.createCard({
    name: 'Card 2',
    cost: 15,
    description: 'Card 2 Desc',
    attack: 'Card 2 attack',
    defense: 'Card 2 defense'
  }),
  Card.createCard({
    name: 'Card 3',
    cost: 8,
    description: 'Card 3 Desc',
    attack: 'Card 3 attack',
    defense: 'Card 3 defense'
  }),
  Card.createCard({
    name: 'Card 4',
    cost: 37,
    description: 'Card 4 Desc',
    attack: 'Card 4 attack',
    defense: 'Card 4 defense'
  })
]

const initCards = function () {
  ui.displayCards(cards)
}

module.exports = {
  initCards
}
