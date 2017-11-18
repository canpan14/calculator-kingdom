'use strict'

const Card = function (card) {
  this.name = card.name
  this.description = card.description
  this.type = card.type
  this.cost = card.cost
  this.attack = card.attack
  this.defense = card.defense
}

const createCard = function (card) {
  return new Card(card)
}

module.exports = {
  createCard
}
