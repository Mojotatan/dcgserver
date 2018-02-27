// Define db
const Sequelize = require('sequelize')
let dbUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/dcgserver'

let db = new Sequelize(dbUrl, {logging: false})

// Import tables
const models = [
  require('./models/user-model'),
  require('./models/card-model'),
  require('./models/collection-model'),
]

models.forEach(model => {
  model(db)
})

// Associations
let {User, Card, Collection} = db.models

User.belongsToMany(Card, {through: Collection})
Card.belongsToMany(User, {through: Collection})


// Export db
module.exports = {db}