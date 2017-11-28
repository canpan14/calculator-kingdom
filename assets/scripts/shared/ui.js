'use strict'

const clearAllViews = function () {
  $('#authView').empty()
  $('#homeView').empty()
  $('#gameView').empty()
  $('#decksView').empty()
  $('#changePasswordView').empty()
}

const successNotification = function (text, time = 1500) {
  $.notify({
    message: text
  }, {
    type: 'success',
    placement: {
      from: 'top',
      align: 'center'
    },
    animate: {
      enter: 'animated fadeInDown',
      exit: 'animated fadeOutUp'
    },
    allow_dismiss: false,
    z_index: 1070,
    delay: time,
    timer: 500
  })
}

const failureNotification = function (text, time = 1500) {
  $.notify({
    message: text
  }, {
    type: 'danger',
    placement: {
      from: 'top',
      align: 'center'
    },
    animate: {
      enter: 'animated fadeInDown',
      exit: 'animated fadeOutUp'
    },
    allow_dismiss: false,
    z_index: 1070,
    delay: time,
    timer: 500
  })
}

module.exports = {
  clearAllViews,
  successNotification,
  failureNotification
}
