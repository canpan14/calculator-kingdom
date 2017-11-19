'use strict'

const config = require('../config')
const store = require('../store')

const getCards = function () {
  return $.ajax({
    url: config.apiOrigin + 'cards',
    method: 'GET'
  })
}

const getCard = function (id) {
  return $.ajax({
    url: config.apiOrigin + 'cards/' + id,
    method: 'GET'
  })
}

module.exports = {
  getCards,
  getCard
}
