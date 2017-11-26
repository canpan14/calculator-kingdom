'use strict'

const ui = require('./ui')
const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')

const showDecksView = function () {
  api.getDecks()
    .then(ui.showDecksView)
    .then(() => {
      $('#newDeckForm').on('submit', onCreateDeck)
      $('#myDecks > tbody > tr').on('click', modifyDeck)
    })
    .catch(ui.getDecksFailure)
}

const onCreateDeck = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.createDeck(formData)
    .then(showDecksView)
    .catch(ui.createDeckFailure)
}

const modifyDeck = function (event) {
  event.preventDefault()
  api.getDeck(event.currentTarget.id)
    .then(ui.showDeckManagement)
    .then(() => {
      $('#multiselect').multiselect()
      $('#saveDeckForm').on('submit', onSaveDeck)
    })
    .catch(ui.getDeckFailure)
}

const onSaveDeck = function (event) {
  event.preventDefault()
  const formData = $(event.target).serializeArray()
  const deckId = formData.find(data => data.name === 'deck').value
  const deckName = formData.find(data => data.name === 'deckName').value
  const cardsInDeck = []
  formData.forEach(data => {
    if (data.name === 'to') {
      cardsInDeck.push(data.value)
    }
  })
  console.log(cardsInDeck)
  api.updateDeck(deckId, deckName, cardsInDeck)
    .then(showDecksView)
    .catch(ui.updateDeckFailure)
}

const registerHandlers = function () {
  $('#decks').on('click', showDecksView)
}

module.exports = {
  registerHandlers
}
