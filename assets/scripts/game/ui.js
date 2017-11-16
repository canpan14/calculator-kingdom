'use strict'

const gameViewHbs = require('../templates/gameView.handlebars')
const cardInHolder = require('../templates/cardInHolder.handlebars')

const initGameView = function () {
  $('#gameView').empty()
  $('#gameView').append(gameViewHbs())
}

const displayCards = function (cards) {
  $('#cardHolder').empty()
  $('#cardHolder').append(cardInHolder({ cards: cards }))
}

module.exports = {
  initGameView,
  displayCards
}
