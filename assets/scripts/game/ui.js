'use strict'

const gameViewHbs = require('../templates/gameView.handlebars')
const cardInHolder = require('../templates/cardInHolder.handlebars')

const numberIds = ['calc-1', 'calc-2', 'calc-3', 'calc-4', 'calc-5', 'calc-6', 'calc-7', 'calc-8', 'calc-9']

const initGameView = function () {
  $('#gameView').empty()
  $('#gameView').append(gameViewHbs())
}

const displayCards = function (cards) {
  $('#cardHolder').empty()
  cards.forEach(card => {
    switch (card.type) {
      case 'attack':
        card.backColor = '#ffcccccc'
        break
      case 'defense':
        card.backColor = '#ccccff'
        break
      case 'spell':
        card.backColor = '#ffccff'
        break
    }
  })
  $('#cardHolder').append(cardInHolder({ cards: cards }))
}

const combineNumbers = function (numberToCombineInto, previousNumber, result) {
  previousNumber.attr('disabled', true)
  previousNumber.text('- -')
  numberToCombineInto.text(result)
}

const resetCalc = function (boardToResetTo) {
  if (boardToResetTo) {
    for (let i = 0; i < numberIds.length; i++) {
      $('#' + numberIds[i]).text(boardToResetTo[i])
      if ($('#' + numberIds[i]).text().includes('- -')) {
        $('#' + numberIds[i]).attr('disabled', true)
      } else {
        $('#' + numberIds[i]).attr('disabled', false)
      }
    }
  }
  removeClickedCSS()
}

const numberClicked = function (number) {
  removeClickedCSS()
  addClickedCSS(number)
}

const removeNumber = function (number) {
  number.text('- -')
  number.attr('disabled', true)
}

const removeClickedCSS = function () {
  for (let i = 0; i < numberIds.length; i++) {
    $('#' + numberIds[i]).removeClass('clicked')
  }
}

const addClickedCSS = function (numberClicked) {
  numberClicked.addClass('clicked')
}

module.exports = {
  initGameView,
  displayCards,
  resetCalc,
  numberClicked,
  combineNumbers,
  removeClickedCSS,
  removeNumber

}
