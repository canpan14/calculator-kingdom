'use strict'

const store = require('../store')

const signInHbs = require('../templates/signIn.handlebars')
const signUpHbs = require('../templates/signUp.handlebars')
const changePasswordHbs = require('../templates/changePasswordModal.handlebars')

const showSignIn = function () {
  $('#authView').empty()
  $('#authView').append(signInHbs())
}

const showSignUp = function () {
  $('#authView').empty()
  $('#authView').append(signUpHbs())
}

const showChangePassword = function () {
  $('#changePasswordView').empty()
  $('#changePasswordView').append(changePasswordHbs())
  $('#changePasswordModal').modal('show')
}

const onSignInSuccess = function (response) {
  store.user = response.user
  $('#authView').empty()
  $('.active-after-signin').show()
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

const onSignOutSuccess = function () {
  $('#gameView').empty()
  $('.active-after-signin').hide()
  console.log('signed out')
}

const onSignOutFailure = function () {
  onSignOutSuccess()
}

const onChangePasswordSuccess = function () {
  $('#changePasswordModal').modal('hide')
  $('#changePasswordForm').get(0).reset()
}

const onChangePasswordFailure = function () {
  console.log('change password failure')
}

module.exports = {
  showChangePassword,
  showSignIn,
  showSignUp,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignUpSuccess,
  onSignUpFailure,
  onSignOutSuccess,
  onSignOutFailure
}
