'use strict'

const ui = require('./ui')
const api = require('./api')
const calcLogic = require('./calcLogic')
const calcState = require('./calcState')
const gameState = require('./gameState')

const _maxHandSize = 6

const newGame = function (cardsInPlayerDeck) {
  gameState.clearState()
  gameState.setPlayerHealth(100)
  gameState.setEnemyHealth(100)
  gameState.setGameOver(false)
  ui.updateHealthValues(gameState.getPlayerHealth(), gameState.getEnemyHealth())
  return api.getCards()
    .then((response) => {
      gameState.setCardLookupTable(response.cards)
      if (cardsInPlayerDeck !== undefined && cardsInPlayerDeck !== null && cardsInPlayerDeck.length > 0) {
        gameState.setPlayerDeck(cardsInPlayerDeck)
      } else {
        gameState.setPlayerDeck(gameState.getCardLookupTable())
      }
      fillHands()
    })
}

const fillHands = function () {
  const enemyCardOptions = gameState.getCardLookupTable()
  const playerCardOptions = gameState.getPlayerDeck()
  const cardsInHand = gameState.getPlayerHand().length
  const cardsInEnemyHand = gameState.getEnemyHand().length
  for (let i = cardsInHand; i < _maxHandSize; i++) {
    const cardToAdd = playerCardOptions[Math.floor(Math.random() * playerCardOptions.length)]
    gameState.addCardToPlayerHand(cardToAdd.id)
    ui.displayCard(cardToAdd)
  }
  for (let i = cardsInEnemyHand; i < _maxHandSize; i++) {
    const cardToAddForEnemy = enemyCardOptions[Math.floor(Math.random() * enemyCardOptions.length)]
    gameState.addCardToEnemyHand(cardToAddForEnemy.id)
  }
}

const playCard = function (event, selectedNumber) {
  if (selectedNumber === null) return false
  if (+$(event.currentTarget).data('cost') === +selectedNumber.text()) {
    const card = gameState.getCardLookupTable().find(card => card.id === $(event.currentTarget).data('id'))
    gameState.addCardToPlayerField($(event.currentTarget).data('id'))
    gameState.removeCardFromPlayerHand(card.id)
    calcState.saveStateOfCalc()
    ui.addCardToPlayerField(card)
    $(event.currentTarget).remove()
    return true
  } else {
    return false
  }
}

const areAllCardsPlayed = function () {
  if ($('.playingCard').length <= 0) {
    return true
  }
  return false
}

const enemyRandomlyPlayCards = function () {
  const enemyHand = gameState.getEnemyHand()
  const max = enemyHand.length - 3
  const min = 2
  const numberOfCardsToPlay = Math.floor(Math.random() * (max - min)) + min
  for (let i = 0; i < numberOfCardsToPlay; i++) {
    const cardToPlay = enemyHand[Math.floor(Math.random() * enemyHand.length)]
    gameState.addCardToEnemyField(cardToPlay)
    ui.addCardToEnemyField(gameState.getCardLookupTable().find(card => card.id === cardToPlay))
    gameState.removeCardFromEnemyHand(cardToPlay)
  }
}

const fightRound = function () {
  if (gameState.getGameOver()) return
  // Have enemy randomly play some cards
  enemyRandomlyPlayCards()

  const damageTaken = calculateDamageTaken()
  const playerDamageTaken = damageTaken[0]
  const enemyDamageTaken = damageTaken[1]

  gameState.setPlayerHealth(gameState.getPlayerHealth() - playerDamageTaken)
  gameState.setEnemyHealth(gameState.getEnemyHealth() - enemyDamageTaken)
  ui.updateHealthValues(gameState.getPlayerHealth(), gameState.getEnemyHealth())
  // For now player gets priority on winning if both die at the same time
  if (isWin()) {
    gameState.setGameOver(true)
  } else if (isLose()) {
    gameState.setGameOver(true)
  } else {
    fillHands()
    calcLogic.resetBoard()
  }
}

const isWin = function () {
  return gameState.getEnemyHealth() <= 0
}

const isLose = function () {
  return gameState.getPlayerHealth() <= 0
}

const calculateDamageTaken = function () {
  const playerField = gameState.getPlayerField()
  const enemyField = gameState.getEnemyField()
  let playerDamageTaken = 0
  let enemyDamageTaken = 0

  let playerOffenseAttack = 0
  let playerOffenseDefense = 0
  let enemyOffenseAttack = 0
  let enemyOffenseDefense = 0

  let playerDefenseAttack = 0
  let playerDefenseDefense = 0
  let enemyDefenseAttack = 0
  let enemyDefenseDefense = 0

  playerField.forEach(card => {
    card = gameState.getCardLookupTable().find(dbCard => dbCard.id === card)
    switch (card.card_type) {
      case 'attack':
        playerOffenseAttack += card.attack
        playerOffenseDefense += card.defense
        break
      case 'defense':
        playerDefenseAttack += card.attack
        playerDefenseDefense += card.defense
        break
    }
  })

  enemyField.forEach(card => {
    card = gameState.getCardLookupTable().find(dbCard => dbCard.id === card)
    switch (card.card_type) {
      case 'attack':
        enemyOffenseAttack += card.attack
        enemyOffenseDefense += card.defense
        break
      case 'defense':
        enemyDefenseAttack += card.attack
        enemyDefenseDefense += card.defense
        break
    }
  })

  if (playerOffenseAttack < enemyDefenseDefense) {
    if (enemyDefenseAttack > playerOffenseDefense) {
      playerDamageTaken += enemyDefenseAttack - playerOffenseDefense
    }
  } else {
    enemyDamageTaken += playerOffenseAttack - enemyDefenseDefense
  }

  if (enemyOffenseAttack < playerDefenseDefense) {
    if (playerDefenseAttack > enemyOffenseDefense) {
      enemyDamageTaken += playerDefenseAttack - enemyOffenseDefense
    }
  } else {
    playerDamageTaken += enemyOffenseAttack - playerDefenseDefense
  }

  return [playerDamageTaken, enemyDamageTaken]
}

module.exports = {
  playCard,
  areAllCardsPlayed,
  newGame,
  fightRound
}
