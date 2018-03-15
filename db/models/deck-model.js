const Sequelize = require('sequelize')

module.exports = db => db.define('Deck', {
  name: {
    type: Sequelize.STRING
  }
})