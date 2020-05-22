import React from 'react'
import { Route, Switch } from 'react-router'
import HomePage from './home/HomePage'
import Navbar from './Navbar'

function App () {
  return (
    <>
      <Navbar/>
      <Switch>
        <Route path="/">
          <HomePage/>
        </Route>
      </Switch>
    </>
  )
}

export default App
