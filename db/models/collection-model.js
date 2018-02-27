const Sequelize = require('sequelize')

module.exports = db => db.define('Collection', {
  quantity: {
    type: Sequelize.INTEGER
  }
})