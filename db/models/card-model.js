const Sequelize = require('sequelize')

module.exports = db => db.define('Card', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  cost: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  type: {
    type: Sequelize.ENUM('Unit', 'Spell', 'Structure', 'Aura', 'General')
  }
})