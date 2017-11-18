'use strict'

const ui = require('./ui')

const numbersInCalc = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let lastNumber = null
let operation = null
const saveState = []
const internalBoardState = []
const numberIds = ['calc-1', 'calc-2', 'calc-3', 'calc-4', 'calc-5', 'calc-6', 'calc-7', 'calc-8', 'calc-9']

const getCurrentlySelectedNumber = () => lastNumber
const getCurrentlySelectedOperation = () => operation
const getNumberAtId = (id) => {
  return internalBoardState[+id.split('-')[1] - 1]
}
const setCurrentNumber = (num) => {
  lastNumber = num
}
const setCurrentOperation = (op) => {
  if (op === null) {
    operation = null
    return
  }
  operation = op.text()
}

const currentNumberWasUsedToPlayCard = function () {
  lastNumber = null
  operation = null
  saveStateOfCalc()
}

const clearSelectedValues = function () {
  lastNumber = null
  operation = null
}

const resetToPriorSaveState = function () {
  clearSelectedValues()
  loadSaveState()
  ui.resetCalc(saveState)
}

const newCalcBoard = function () {
  clearSelectedValues()
  for (let i = 0; i < numberIds.length; i++) {
    $('#' + numberIds[i]).text(numbersInCalc[Math.floor(Math.random() * numbersInCalc.length)])
  }
  saveStateOfCalc()
  saveInteralBoardState()
  ui.resetCalc(null)
}

const loadSaveState = function () {
  for (let i = 0; i < numberIds.length; i++) {
    $('#' + numberIds[i]).text(saveState[i])
  }
}

const saveStateOfCalc = function () {
  saveState.length = 0
  for (let i = 0; i < numberIds.length; i++) {
    saveState[i] = $('#' + numberIds[i]).text()
  }
  saveInteralBoardState()
}

const saveInteralBoardState = function () {
  internalBoardState.length = 0
  for (let i = 0; i < numberIds.length; i++) {
    internalBoardState[i] = $('#' + numberIds[i]).text()
  }
}

module.exports = {
  resetToPriorSaveState,
  newCalcBoard,
  saveStateOfCalc,
  saveInteralBoardState,
  getCurrentlySelectedNumber,
  getCurrentlySelectedOperation,
  setCurrentNumber,
  setCurrentOperation,
  getNumberAtId,
  clearSelectedValues,
  currentNumberWasUsedToPlayCard
}
