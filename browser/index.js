import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'

import App from './App'

import io from 'socket.io-client'
let socket = io.connect()

socket.on('err', err => console.error(err))

import {loadUser} from './store/user-reducer'
socket.on('user_update', user => {
  store.dispatch(loadUser(user))
})

import {newChat, setChannel} from './store/chat-reducer'
socket.on('chat', chatLog => {
  store.dispatch(newChat(chatLog))
})
socket.on('channel', channel => {
  store.dispatch(setChannel(channel))
  store.dispatch(newChat(`Joined channel: ${channel}`))
})

import {loadGames} from './store/games-reducer'
socket.on('games_update', games => {
  console.log('goimes', games)
  store.dispatch(loadGames(games))
})

render(
  (
    <Provider store={store}>
      <Router >
        <App socket={socket}/>
      </Router>
    </Provider>
  ), document.getElementById('app'))
