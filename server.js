const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

const db = require('./db').db

let port = process.env.PORT || '3000'
const app = express()
db.sync({force: true})
.then(() => {
  const server = app.listen(port, () => console.log(`Listening on port ${port}...`))

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