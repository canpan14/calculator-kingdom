'use strict'

const ui = require('./ui')
const calcState = require('./calcState')

const onPlayCard = function () {
  resetBoard()
  calcState.saveStateOfCalc()
}

const onClearButton = function () {
  calcState.resetToPriorSaveState()
}

const onOperationButton = function (event) {
  event.preventDefault()
  if (calcState.getCurrentlySelectedNumber() !== null) {
    calcState.setCurrentOperation($(event.target))
  }
}

const onNumberButton = function (event) {
  event.preventDefault()
  if (resetIfSameNumberClicked(event.target)) return
  if (calcState.getCurrentlySelectedOperation() !== null) {
    switch (calcState.getCurrentlySelectedOperation()) {
      case '+':
        ui.combineNumbers($(event.target),
          calcState.getCurrentlySelectedNumber(),
          +calcState.getCurrentlySelectedNumber().text() + +calcState.getNumberAtId($(event.target).attr('id')))
        break
      case '-':
        ui.combineNumbers($(event.target),
          calcState.getCurrentlySelectedNumber(),
          +calcState.getCurrentlySelectedNumber().text() - +calcState.getNumberAtId($(event.target).attr('id')))
        break
      case 'X':
        ui.combineNumbers($(event.target),
          calcState.getCurrentlySelectedNumber(),
          +calcState.getCurrentlySelectedNumber().text() * +calcState.getNumberAtId($(event.target).attr('id')))
        break
    }
    calcState.setCurrentOperation(null)
    calcState.saveInteralBoardState()
    calcState.setCurrentNumber($(event.target))
    ui.numberClicked($(event.target))
  } else {
    calcState.setCurrentNumber($(event.target))
    ui.numberClicked(calcState.getCurrentlySelectedNumber())
  }
  calcState.saveInteralBoardState()
}

const resetIfSameNumberClicked = function (numberClicked) {
  if (calcState.getCurrentlySelectedNumber() === null) return false
  if (calcState.getCurrentlySelectedNumber().attr('id') === numberClicked.id) {
    calcState.clearSelectedValues()
    ui.removeClickedCSS()
    return true
  }
  return false
}

const resetBoard = function () {
  calcState.newCalcBoard()
}

const registerHandlers = function () {
  $('.reset-calc').on('click', onClearButton)
  $('.operation').on('click', onOperationButton)
  $('.number').on('click', onNumberButton)
}

const initCalcLogic = function () {
  registerHandlers()
  calcState.newCalcBoard()
}

module.exports = {
  initCalcLogic
}
