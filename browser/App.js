import React, { Component } from 'react'
import {Route, Link} from 'react-router-dom'

import Menu from './containers/Menu'


const App = () => (
  <div className="app">
    <main>
      <Route path="/menu" component={Menu} />
    </main>
  </div>
)

export default App