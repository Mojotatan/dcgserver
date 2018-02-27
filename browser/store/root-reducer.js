import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user: require('./user-reducer').default,
  chat: require('./chat-reducer').default,
  games: require('./games-reducer').default
})

export default rootReducer