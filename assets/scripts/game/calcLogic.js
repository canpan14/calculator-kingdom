'use strict'

const numbersInCalc = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let lastNumber = null
let operation = null
const saveState = []
const internalBoardState = []
const numberIds = ['calc1', 'calc2', 'calc3', 'calc4', 'calc5', 'calc6', 'calc7', 'calc8', 'calc9']

const getCurrentlySelectedNumber = () => lastNumber

const onPlayCard = function () {
  resetBoard()
}

const onClearButton = function () {
  removeClickedCSS()
  $('.number').attr('disabled', false)
  $('.operation').attr('disabled', true)
  lastNumber = null
  operation = null
  loadSaveState()
}

const onOperationButton = function (event) {
  event.preventDefault()
  if (lastNumber !== null) {
    operation = $(event.target).text()
  }
}

const onNumberButton = function (event) {
  event.preventDefault()
  if (resetIfSameNumberClicked(event.target)) return
  if (operation !== null) {
    $('.operation').attr('disabled', true)
    switch (operation) {
      case '+':
        combineNumbers($(event.target), parseInt(lastNumber.text()) + parseInt($(event.target).text()))
        break
      case '-':
        combineNumbers($(event.target), parseInt(lastNumber.text()) - parseInt($(event.target).text()))
        break
      case 'X':
        combineNumbers($(event.target), parseInt(lastNumber.text()) * parseInt($(event.target).text()))
        break
    }
    lastNumber = null
    operation = null
  } else {
    $('.operation').attr('disabled', false)
    lastNumber = $(event.target)
    removeClickedCSS()
    addClickedCSS(lastNumber)
  }
}

const loadSaveState = function () {
  for (let i = 0; i < numberIds.length; i++) {
    $('#' + numberIds[i]).text(saveState[i])
  }
}

const setCalcBoard = function () {
  for (let i = 0; i < numberIds.length; i++) {
    $('#' + numberIds[i]).text(numbersInCalc[Math.floor(Math.random() * numbersInCalc.length)])
  }
  saveStateOfCalc()
  saveInteralBoardState()
}

const saveStateOfCalc = function () {
  saveState.length = 0
  for (let i = 0; i < numberIds.length; i++) {
    saveState[i] = $('#' + numberIds[i]).text()
  }
}

const saveInteralBoardState = function () {
  internalBoardState.length = 0
  for (let i = 0; i < numberIds.length; i++) {
    internalBoardState[i] = $('#' + numberIds[i]).text()
  }
}

const combineNumbers = function (numberToCombineInto, result) {
  lastNumber.attr('disabled', true)
  lastNumber.text('- -')
  numberToCombineInto.text(result)
}

const resetIfSameNumberClicked = function (numberClicked) {
  if (lastNumber === null) return false
  if (lastNumber.attr('id') === numberClicked.id) {
    return true
  }
  return false
}

const addClickedCSS = function (numberClicked) {
  numberClicked.addClass('clicked')
}

const removeClickedCSS = function () {
  for (let i = 0; i < numberIds.length; i++) {
    $('#' + numberIds[i]).removeClass('clicked')
  }
}

const resetBoard = function () {
  removeClickedCSS()
  setCalcBoard()
  $('.operation').attr('disabled', true)
  $('.number').attr('disabled', false)
  lastNumber = null
  operation = null
}

const registerHandlers = function () {
  $('#playCard').on('click', onPlayCard)
  $('.reset-calc').on('click', onClearButton)
  $('.operation').on('click', onOperationButton)
  $('.number').on('click', onNumberButton)
}

const initCalcLogic = function () {
  registerHandlers()
  setCalcBoard()
}

module.exports = {
  initCalcLogic,
  getCurrentlySelectedNumber
}
