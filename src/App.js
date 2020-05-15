import React from 'react'
import { Route, Switch } from 'react-router'
import HomePage from './home/HomePage'

function App () {
  return (
    <>
      <Switch>
        <Route path="/">
          <HomePage/>
        </Route>
      </Switch>
    </>
  )
}

export default App
