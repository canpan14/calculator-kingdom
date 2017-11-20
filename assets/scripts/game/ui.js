'use strict'

const gameState = require('./gameState')

const gameViewHbs = require('../templates/gameView.handlebars')
const cardInHolderHbs = require('../templates/cardInHolder.handlebars')
const cardThumbnailHbs = require('../templates/cardThumbnailView.handlebars')

const numberIds = ['calc-1', 'calc-2', 'calc-3', 'calc-4', 'calc-5', 'calc-6', 'calc-7', 'calc-8', 'calc-9']

const initGameView = function () {
  $('#gameView').empty()
  $('#gameView').append(gameViewHbs())
}

const displayCard = function (card) {
  switch (card.card_type) {
    case 'attack':
      card.backColor = '#ffcccccc'
      break
    case 'defense':
      card.backColor = '#ccccff'
      break
  }
  $('#cardHolder').append(cardInHolderHbs(card))
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
  } else {
    $('.number').attr('disabled', false)
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

const addCardToPlayerField = function () {
  const cardsOnField = gameState.getPlayerField()
  const cardDb = gameState.getCardLookupTable()
  const cardsArray = []
  cardsOnField.forEach(card => {
    if (cardsArray.find(cardInArray => cardInArray.id === card)) {
      cardsArray.find(cardInArray => cardInArray.id === card).count += 1
    } else {
      const cardToAdd = cardDb.find(cardInDb => cardInDb.id === card)
      cardToAdd.count = 1
      cardsArray.push(cardToAdd)
    }
  })
  $('#playerAttackCards').empty()
  $('#playerDefenseCards').empty()
  cardsArray.forEach(card => {
    switch (card.card_type) {
      case 'attack':
        $('#playerAttackCards').append(cardThumbnailHbs(card))
        break
      case 'defense':
        $('#playerDefenseCards').append(cardThumbnailHbs(card))
        break
    }
  })
}

const addCardToEnemyField = function () {
  const cardsOnField = gameState.getEnemyField()
  const cardDb = gameState.getCardLookupTable()
  const cardsArray = []
  cardsOnField.forEach(card => {
    if (cardsArray.find(cardInArray => cardInArray.id === card)) {
      cardsArray.find(cardInArray => cardInArray.id === card).count += 1
    } else {
      const cardToAdd = cardDb.find(cardInDb => cardInDb.id === card)
      cardToAdd.count = 1
      cardsArray.push(cardToAdd)
    }
  })
  $('#enemyAttackCards').empty()
  $('#enemyDefenseCards').empty()
  cardsArray.forEach(card => {
    switch (card.card_type) {
      case 'attack':
        $('#enemyAttackCards').append(cardThumbnailHbs(card))
        break
      case 'defense':
        $('#enemyDefenseCards').append(cardThumbnailHbs(card))
        break
    }
  })
}

const updateHealthValues = function (playerHealth = null, enemyHealth = null) {
  if (playerHealth !== null) {
    $('#playerHealth').text(playerHealth)
  }
  if (enemyHealth !== null) {
    $('#enemyHealth').text(enemyHealth)
  }
}

module.exports = {
  initGameView,
  displayCard,
  resetCalc,
  numberClicked,
  combineNumbers,
  removeClickedCSS,
  removeNumber,
  addCardToPlayerField,
  addCardToEnemyField,
  updateHealthValues
}
