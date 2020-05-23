import React from 'react'
import { Route, Switch } from 'react-router'
import HomePage from './home/HomePage'
import Navbar from './Navbar'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import Footer from './Footer'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e6f1e',
    },
    secondary: orange,
  }
})

function App () {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar/>
        <Switch>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
        <Footer/>
      </ThemeProvider>
    </>
  )
}

export default App
