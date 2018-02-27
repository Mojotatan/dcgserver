const Sequelize = require('sequelize')

module.exports = db => db.define('User', {
  name: {
    type: Sequelize.STRING
  }
})