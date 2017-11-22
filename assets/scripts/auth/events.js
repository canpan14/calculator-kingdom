'use strict'

const api = require('./api')
const ui = require('./ui')
const gameEvents = require('../game/events')
const getFormFields = require('../../../lib/get-form-fields')

const onSignIn = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signIn(formData)
    .then(ui.onSignInSuccess)
    .then(showGameScreen)
    .catch(ui.onSignInFailure)
}

const onSignUp = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signUp(formData)
    .then(ui.onSignUpSuccess)
    .then(showSignIn)
    .catch(ui.onSignUpFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.onSignOutSuccess)
    .then(showSignIn)
    .catch(ui.onSignOutFailure)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.changePassword(formData)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

const isAlreadySignedIn = function () {
  return false
}

const showGameScreen = function () {
  gameEvents.initializeGamePage()
}

const showChangePassword = function () {
  ui.showChangePassword()
  $('#changePasswordForm').on('submit', onChangePassword)
}

const showSignIn = function () {
  ui.showSignIn()
  $('#signInForm').on('submit', onSignIn)
  $('#signUpLink').on('click', showSignUp)
}

const showSignUp = function () {
  ui.showSignUp()
  $('#signUpForm').on('submit', onSignUp)
  $('#signUpCancel').on('click', showSignIn)
}

const loadInitialPage = function () {
  if (isAlreadySignedIn()) {
    console.log('loading game')
    gameEvents.initializeGamePage()
  } else {
    console.log('loading sign in')
    showSignIn()
  }
}

const registerHandlers = function () {
  $('#signOut').on('click', onSignOut)
  $('#changePassword').on('click', showChangePassword)
}

module.exports = {
  loadInitialPage,
  registerHandlers
}
