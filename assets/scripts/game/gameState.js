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
let playerDeck = []
let enemyDeck = []

let playerHealth = null
let enemyHealth = null

let gameOver = false

const getGameOver = () => gameOver
const setGameOver = (newGameOver) => {
  gameOver = newGameOver
}

const getPlayerDeck = () => playerDeck
const getEnemyDeck = () => enemyDeck

const setPlayerDeck = (pDeck) => {
  playerDeck = playerDeck.concat(pDeck)
}

const setEnemyDeck = (eDeck) => {
  enemyDeck = enemyDeck.concat(eDeck)
}

const getCardLookupTable = () => cardLookupTable

const setCardLookupTable = (cards) => {
  cardLookupTable = cardLookupTable.concat(cards)
}

const clearState = function () {
  playerHand.length = 0
  enemyHand.length = 0
  playerField.length = 0
  enemyField.length = 0
  cardLookupTable.length = 0
  playerHealth = null
  enemyHealth = null
  gameOver = false
}

const addCardToPlayerHand = function (card) {
  playerHand.push(card)
}

const addCardToEnemyHand = function (card) {
  enemyHand.push(card)
}

const removeCardFromPlayerHand = function (id) {
  const index = playerHand.indexOf(playerHand.find(card => card === id))
  if (index > -1) {
    playerHand.splice(index, 1)
  }
}

const removeCardFromEnemyHand = function (id) {
  const index = enemyHand.indexOf(enemyHand.find(card => card === id))
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
  addCardToEnemyField,
  addCardToEnemyHand,
  addCardToPlayerField,
  addCardToPlayerHand,
  clearState,
  getCardLookupTable,
  getEnemyField,
  getEnemyHand,
  getEnemyHealth,
  getGameOver,
  getPlayerField,
  getPlayerHand,
  getPlayerHealth,
  removeCardFromEnemyHand,
  removeCardFromPlayerHand,
  setCardLookupTable,
  setEnemyHealth,
  setGameOver,
  setPlayerHealth,
  getPlayerDeck,
  getEnemyDeck,
  setPlayerDeck,
  setEnemyDeck
}
