// Define db
const Sequelize = require('sequelize')
let dbUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/dcgserver'

let db = new Sequelize(dbUrl, {logging: false})

// Import tables
const models = [
  require('./models/user-model'),
]

models.forEach(model => {
  model(db)
})

// Associations
let {User} = db.models


// Export db
module.exports = {db}