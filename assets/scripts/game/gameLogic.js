'use strict'

const playCard = function (event, selectedNumber) {
  if (parseInt($(event.currentTarget).data('cost')) === parseInt(selectedNumber.text())) {
    console.log('Play card!')
  } else {
    console.log('Card cost is ' + $(event.currentTarget).data('cost') + ', you selected ' + selectedNumber.text())
  }
}

module.exports = {
  playCard
}
