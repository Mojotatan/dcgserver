import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'

import Login from './components/Login'
import Chat from './components/Chat'
import Lobby from './components/Lobby'



const App = (props) => (
  <div className="app">
    <main>
      <Login socket={props.socket} />
      <Chat socket={props.socket} />
      <Route socket={props.socket} path="/lobby" component={Lobby} />
    </main>
  </div>
)

export default App