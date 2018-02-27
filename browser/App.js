import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'

import Login from './components/Login'
import Menu from './components/Menu'



const App = (props) => (
  <div className="app">
    <main>
      <Login socket={props.socket} />
      <Route socket={props.socket} path="/menu" component={Menu} />
    </main>
  </div>
)

export default App