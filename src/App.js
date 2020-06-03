import 'react-toastify/dist/ReactToastify.min.css'

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
import NewCarPage from './components/carprovider/NewCarPage'
import UpdateCarPage from './components/carprovider/UpdateCarPage'
import { ToastContainer } from 'react-toastify'
import SearchCarPage from './components/rent/SearchCarPage'
import background from './_assets/background.jpg'

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
        <div style={{
          backgroundImage: `url(${background}`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50% 50%',
        }}>
          <ToastContainer/>
          <Navbar/>
          <Switch>
            <Route exact path="/">
              <HomePage/>
            </Route>
            <Route exact path="/login">
              <LoginPage/>
            </Route>
            <Route exact path="/register" component={RegisterPage}/>
            <ProtectedRoute exact path="/dashboard" component={DashboardPage}/>
            <ProtectedRoute exact path="/car/new" component={NewCarPage}/>
            <ProtectedRoute exact path="/car/update/:id" component={UpdateCarPage}/>
            <ProtectedRoute exact path="/rent" component={SearchCarPage}/>
          </Switch>
          <Footer/>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
