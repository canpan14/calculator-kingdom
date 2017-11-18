'use strict'

const calcState = require('./calcState')

const playCard = function (event, selectedNumber) {
  if (selectedNumber === null) return false
  if (+$(event.currentTarget).data('cost') === +selectedNumber.text()) {
    console.log('Play card!')
    calcState.saveStateOfCalc()
    $(event.currentTarget).remove()
    return true
  } else {
    console.log('Card cost is ' + $(event.currentTarget).data('cost') + ', you selected ' + selectedNumber.text())
    return false
  }
}

const areAllCardsPlayed = function () {
  if ($('.playingCard').length <= 0) {
    return true
  }
  return false
}

module.exports = {
  playCard,
  areAllCardsPlayed
}
