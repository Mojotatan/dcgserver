const Op = require('sequelize').Op
const bcrypt = require('bcrypt')

const {User} = require('./db').db.models

const getRandomUniqueString = (n, arr) => {
  let str = []
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < n; i++) {
    str.push(alphabet[Math.floor(Math.random() * 26)])
  }
  str = str.join('')
  return (arr.filter(strInArr => strInArr === str).length === 0) ? str : getRandomUniqueString(n, arr)
}

module.exports = (io, socket, games) => {
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

  socket.on('chat', data => {
    io.in(data.channel).emit('chat', `${user.name}: ${data.message}`)
  })

  socket.on('new_game', data => {
    let id = getRandomUniqueString(4, games)
    games.push(id)
    socket.leave('lobby')
    socket.join(id)
    socket.emit('channel', id)
    socket.to('lobby').emit('games_update', games)
  })

  socket.on('logout', () => {
    user = null
  })

  return user
}