const {db} = require('./index')
const {User} = db.models

db.sync({force: true})
.then(() => {
  return User.create({
    name: 'ned',
    password: 'bob'
  })
})
.then((res) => {
  console.log('Database seed complete')
  process.exit()
})
.catch(err => console.error(err))
