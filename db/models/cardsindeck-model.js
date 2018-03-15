const Sequelize = require('sequelize')

module.exports = db => db.define('CardsInDeck', {
  quantity: {
    type: Sequelize.INTEGER
  }
})