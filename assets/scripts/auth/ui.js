'use strict'

const store = require('../store')
const sharedUI = require('../shared/ui')

const signInHbs = require('../templates/signIn.handlebars')
const signUpHbs = require('../templates/signUp.handlebars')
const changePasswordHbs = require('../templates/changePasswordModal.handlebars')

const showSignIn = function () {
  sharedUI.clearAllViews()
  $('#authView').append(signInHbs())
}

const showSignUp = function () {
  sharedUI.clearAllViews()
  $('#authView').append(signUpHbs())
}

const showChangePassword = function () {
  $('#changePasswordView').empty()
  $('#changePasswordView').append(changePasswordHbs())
  $('#changePasswordModal').modal('show')
}

const onSignInSuccess = function (response) {
  store.user = response.user
  sharedUI.clearAllViews()
  $('.active-after-signin').show()
}

const onSignInFailure = function () {
  console.log('failed to sign in')
}

const onSignUpSuccess = function () {
  sharedUI.clearAllViews()
}

const onSignUpFailure = function () {
  console.log('failed to sign up')
}

const onSignOutSuccess = function () {
  sharedUI.clearAllViews()
  $('.active-after-signin').hide()
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
