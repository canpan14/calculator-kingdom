'use strict'

const ui = require('./ui')
const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')

const showDecksView = function () {
  api.getDecks()
    .then(ui.showDecksView)
    .then(() => {
      $('#newDeckBtn').on('click', onCreateDeck)
      $('#myDecks > tbody > tr').on('click', modifyDeck)
    })
    .catch(ui.getDecksFailure)
}

const onCreateDeck = function () {
  event.preventDefault()
  api.createDeck()
    .then(response => modifyDeck(null, response.deck.id))
    .catch(ui.createDeckFailure)
}

const modifyDeck = function (event, idFromCreation = null) {
  let id = null
  if (!idFromCreation) {
    event.preventDefault()
    id = event.currentTarget.id
  } else {
    id = idFromCreation
  }
  api.getDeck(id)
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
  let deckName = formData.find(data => data.name === 'deckName').value
  if (deckName.trim() === '') {
    deckName = 'Unnamed Army'
  }
  const cardsInDeck = []
  formData.forEach(data => {
    if (data.name === 'to') {
      cardsInDeck.push(data.value)
    }
  })
  api.updateDeck(deckId, deckName, cardsInDeck)
    .then(showDecksView)
    .catch(ui.updateDeckFailure)
}

const registerHandlers = function () {
}

module.exports = {
  registerHandlers,
  showDecksView
}
