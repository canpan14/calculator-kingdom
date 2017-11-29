'use strict'

const ui = require('./ui')
const api = require('./api')

let deckCurrentModifying = null
let lastOptionClicked = null

const showDecksView = function () {
  deckCurrentModifying = null
  lastOptionClicked = null
  api.getDecks()
    .then(ui.showDecksView)
    .then(() => {
      $('#newDeckBtn').on('click', onCreateDeck)
      $('#myDecks > tbody > tr').on('click', modifyDeck)
      $('.deleteDeck').on('click', onDeleteDeck)
    })
    .catch(ui.getDecksFailure)
}

const onDeleteDeck = function (event) {
  event.stopPropagation()
  api.deleteDeck($(event.currentTarget).data('id'))
    .then(showDecksView)
    .catch(ui.deleteDeckFailure)
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
  deckCurrentModifying = id
  api.getDeck(id)
    .then(ui.showDeckManagement)
    .then(() => {
      $('#multiselect').multiselect({
        beforeMoveToRight: addCardToDeck,
        beforeMoveToLeft: removeCardFromDeck
      })
      $('#saveDeckForm').on('submit', onSaveDeck)
      $('#multiselect').change(function () {
        lastOptionClicked = $('#multiselect option:selected')[0]
      })
      $('#multiselect_to').change(function () {
        lastOptionClicked = $('#multiselect_to option:selected')[0]
      })
      $('#viewCard').on('click', viewSelectedCard)
    })
    .catch(ui.getDeckFailure)
}

const viewSelectedCard = function () {
  if (!lastOptionClicked) return
  ui.viewSelectedCard(lastOptionClicked)
}

const addCardToDeck = function (left, right, selected) {
  return api.addCardToDeck(deckCurrentModifying, selected[0].value)
    .then((response) => {
      $(selected[0]).attr('data-cid', response.cards_in_deck.id)
      ui.addCardSuccess(response)
    })
    .catch(ui.addCardFailure)
}

const removeCardFromDeck = function (left, right, selected) {
  return api.removeCardFromDeck($(selected[0]).attr('data-cid'))
    .then((response) => {
      $(selected[0]).removeAttr('data-cid')
      ui.removeCardSuccess(response)
    })
    .catch(ui.removeCardFailure)
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
