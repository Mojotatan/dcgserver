const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = db => db.define('User', {
  name: {
    type: Sequelize.STRING
  },
  pwHash: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.VIRTUAL
  }
}, {
  hooks: {
    beforeCreate: hashIt,
    beforeUpdate: hashIt
  }
})

function hashIt(user) {
  if (!user.password) return Promise.resolve(user)
  return new Promise((resolve, reject) => {
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
      if (err) return reject(err)
      user.set('pwHash', hash)
      resolve(user)
    })
  })
}