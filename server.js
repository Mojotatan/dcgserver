const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

const db = require('./db').db

let port = process.env.PORT || '8080'
const app = express()
db.sync()
.then(() => {
  const server = app.listen(port, () => console.log(`Listening on port ${port}...`))


  let games = []

  const io = require('socket.io')(server)

  io.on('connection', socket => {
    console.log('new connection', socket.id)
    socket.join('lobby')
    socket.emit('channel', 'lobby')
    socket.emit('games_update', games)
    
    require('./sockets')(io, socket, games)

    socket.on('disconnect', () => {
      console.log('user left', socket.id)
      // prune dead game lobbies
    })
  })

  app
    .use(morgan('tiny'))

    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))

    .use(express.static('public'))

    .get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, './public/index.html'))
    })
})
.catch(err => console.error(err))