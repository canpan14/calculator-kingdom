'use stric'

const playerHand = []
const enemyHand = []

const playerField = []
const enemyField = []

const getPlayerHand = () => playerHand
const getEnemyHand = () => enemyHand
const getPlayerField = () => playerField
const getEnemyField = () => enemyField

let cardLookupTable = []

let playerHealth = null
let enemyHealth = null

const getCardLookupTable = () => cardLookupTable

const setCardLookupTable = (cards) => {
  cardLookupTable = cardLookupTable.concat(cards)
}

const addCardToPlayerHand = function (card) {
  playerHand.push(card)
}

const addCardToEnemyHand = function (card) {
  enemyHand.push(card)
}

const removeCardFromPlayerHand = function (id) {
  const index = playerHand.indexOf(playerHand.find(card => card.id === id))
  if (index > -1) {
    playerHand.splice(index, 1)
  }
}

const removeCardFromEnemyHand = function (id) {
  const index = enemyHand.indexOf(enemyHand.find(card => card.id === id))
  if (index > -1) {
    enemyHand.splice(index, 1)
  }
}

const addCardToPlayerField = function (card) {
  playerField.push(card)
}

const addCardToEnemyField = function (card) {
  enemyField.push(card)
}

const getPlayerHealth = () => playerHealth
const getEnemyHealth = () => enemyHealth

const setPlayerHealth = (newHealth) => {
  playerHealth = newHealth
}

const setEnemyHealth = (newHealth) => {
  enemyHealth = newHealth
}

module.exports = {
  getPlayerHand,
  getEnemyHand,
  getPlayerField,
  getEnemyField,
  addCardToPlayerHand,
  addCardToEnemyHand,
  removeCardFromPlayerHand,
  removeCardFromEnemyHand,
  addCardToPlayerField,
  addCardToEnemyField,
  getPlayerHealth,
  getEnemyHealth,
  setPlayerHealth,
  setEnemyHealth,
  getCardLookupTable,
  setCardLookupTable
}
