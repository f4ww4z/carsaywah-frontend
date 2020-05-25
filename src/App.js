import React from 'react'
import { Route, Switch } from 'react-router'
import HomePage from './components/home/HomePage'
import Navbar from './components/Navbar'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import Footer from './components/Footer'
import LoginPage from './components/auth/LoginPage'
import { BrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import DashboardPage from './components/DashboardPage'
import RegisterPage from './components/auth/RegisterPage'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e6f1e',
      contrastText: '#ffffff',
    },
    secondary: orange,
  }
})

function App () {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div>
          <Navbar/>
          <Switch>
            <Route exact path="/">
              <HomePage/>
            </Route>
            <Route exact path="/login">
              <LoginPage/>
            </Route>
            <Route exact path="/register">
              <RegisterPage/>
            </Route>
            <ProtectedRoute exact path="/dashboard">
              <DashboardPage/>
            </ProtectedRoute>
          </Switch>
          <Footer/>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
