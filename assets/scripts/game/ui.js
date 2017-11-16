'use strict'

const gameViewHbs = require('../templates/gameView.handlebars')

const initGameView = function () {
  $('#gameView').empty()
  $('#gameView').append(gameViewHbs)
}

module.exports = {
  initGameView
}
