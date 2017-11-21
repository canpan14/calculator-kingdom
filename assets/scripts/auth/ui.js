'use strict'

const signInHbs = require('../templates/signIn.handlebars')
const signUpHbs = require('../templates/signUp.handlebars')

const showSignIn = function () {
  $('#authView').empty()
  $('#authView').append(signInHbs())
}

const showSignUp = function () {
  $('#authView').empty()
  $('#authView').append(signUpHbs())
}

const onSignInSuccess = function () {
  $('#authView').empty()
}

const onSignInFailure = function () {
  console.log('failed to sign in')
}

const onSignUpSuccess = function () {
  $('#authView').empty()
}

const onSignUpFailure = function () {
  console.log('failed to sign up')
}

module.exports = {
  showSignIn,
  showSignUp,
  onSignInSuccess,
  onSignInFailure,
  onSignUpSuccess,
  onSignUpFailure
}
