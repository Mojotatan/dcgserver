// Define db
const Sequelize = require('sequelize')
let dbUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/dcgserver'

let db = new Sequelize(dbUrl, {logging: false})

// Import tables
const models = [
  require('./models/user-model'),
  require('./models/card-model'),
  require('./models/collection-model'),
  require('./models/deck-model'),
  require('./models/cardsindeck-model'),
]

models.forEach(model => {
  model(db)
})

// Associations
let {User, Card, Collection, Deck, CardsInDeck} = db.models

User.belongsToMany(Card, {through: Collection})
Card.belongsToMany(User, {through: Collection})

User.belongsToMany(Deck, {through: 'UserDeck'})
Deck.belongsToMany(User, {through: 'UserDeck'})

Card.belongsToMany(Deck, {through: CardsInDeck})
Deck.belongsToMany(Card, {through: CardsInDeck})


// Export db
module.exports = {db}