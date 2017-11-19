'use stric'

const playerHand = []
const enemyHand = []

const playerField = []
const enemyField = []

const getPlayerHand = () => playerHand
const getEnemyHand = () => enemyHand
const getPlayerField = () => playerField
const getEnemyField = () => enemyField

let playerHealth = null
let enemyHealth = null

const addCardToPlayerHand = function (card) {
  playerHand.push(card)
}

const addCardToEnemyHand = function (card) {
  enemyHand.push(card)
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
  addCardToPlayerField,
  addCardToEnemyField,
  getPlayerHealth,
  getEnemyHealth,
  setPlayerHealth,
  setEnemyHealth
}
