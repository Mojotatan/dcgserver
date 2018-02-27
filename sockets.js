const Op = require('sequelize').Op
const bcrypt = require('bcrypt')

const {User} = require('./db').db.models

module.exports = socket => {
  let user

  socket.on('login', (credentials) => {
    let userMatch
    User.findOne({
      where: {
        name: {
          [Op.eq]: credentials.user
        }
      },
      // include: []
    })
    .then(match => {
      if (!match) socket.emit('err', 'Incorrect username or password')
      else {
        userMatch = match
        return bcrypt.compare(credentials.pw, match.pwHash)
      }
    })
    .then(match => {
      if (!match) socket.emit('err', 'Incorrect username or password')
      else {
        user = userMatch
        socket.emit('user_update', user)
      }
    })
    .catch(err => {
      console.error(err)
      socket.emit('err', err)
    })
  })

  socket.on('logout', () => {
    user = null
  })
}